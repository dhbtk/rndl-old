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
    results = find_by_sql([<<EOF, vehicle_id, per, offset])
select current.*,
round(coalesce(next.odometer/current.liters, 0), 2) as economy,
round(coalesce(current.total_cost/next.odometer, 0), 2) as km_cost,
coalesce(round((select sum(distance)
from trips
where vehicle_id = current.vehicle_id and 
	date(start_time) >= date(current.date) and 
	date(start_time) < next.date
)::numeric/1000, 2), 0) as tracked_distance
from refuelings current
left join refuelings next on 
	next.id = (
		select r.id from refuelings r
		where r.vehicle_id = current.vehicle_id and r.date > current.date
		order by r.date limit 1)
where current.vehicle_id = ?
order by current.date desc
limit ? offset ?
EOF
    Page.new(results, (count.to_f / per).ceil, count, page)
  end
end
