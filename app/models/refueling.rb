# == Schema Information
#
# Table name: refuelings
#
#  created_at  :datetime         not null
#  date        :datetime         not null
#  id          :integer          not null, primary key
#  liter_price :decimal(5, 3)
#  liters      :decimal(5, 3)
#  odometer    :decimal(5, 1)
#  total_cost  :decimal(7, 3)
#  updated_at  :datetime         not null
#  vehicle_id  :integer          not null
#
# Indexes
#
#  index_refuelings_on_vehicle_id  (vehicle_id)
#

class Refueling < ApplicationRecord
  belongs_to :vehicle

  validates :vehicle, :date, :liter_price, :liters, :total_cost, :odometer, presence: true

  def self.by_vehicle_id(vehicle_id, page = 1, per = 50)
    count = where(vehicle_id: vehicle_id).count
    offset = (page.to_i - 1)*per
    results = find_by_sql([<<EOF.squish, vehicle_id, per, offset])
SELECT current.*,
round(coalesce(next.odometer/current.liters, 0), 2) as economy,
round(coalesce(current.total_cost/next.odometer, 0), 2) as km_cost,
coalesce(round((select sum(distance)
FROM trips
WHERE vehicle_id = current.vehicle_id AND 
	date(start_time) >= date(current.date) AND 
	date(start_time) < next.date
)::numeric/1000, 2), 0) as tracked_distance
FROM refuelings current
LEFT JOIN refuelings next ON 
	next.id = (
		SELECT r.id FROM refuelings r
		WHERE r.vehicle_id = current.vehicle_id AND r.date > current.date
		ORDER BY r.date LIMIT 1)
WHERE current.vehicle_id = ?
ORDER BY current.date DESC
LIMIT ? OFFSET ?
EOF
    Page.new(results, (count.to_f / per).ceil, count, page)
  end
end
