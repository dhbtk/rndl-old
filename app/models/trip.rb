# == Schema Information
#
# Table name: trips
#
#  average_speed :integer
#  created_at    :datetime         not null
#  distance      :float
#  duration      :time
#  economy       :float
#  fuel_used     :decimal(5, 1)
#  id            :integer          not null, primary key
#  max_speed     :integer
#  start_time    :datetime
#  updated_at    :datetime         not null
#  vehicle_id    :integer
#
# Indexes
#
#  index_trips_on_vehicle_id  (vehicle_id)
#

class Trip < ApplicationRecord
  TIME_OFFSET = 0

  belongs_to :vehicle
  has_many :entries, dependent: :restrict_with_error

  def self.find_by_vehicle_within(vehicle, time_ms)
    session_time = DateTime.strptime(time_ms, '%Q') + TIME_OFFSET
    minus = session_time - 3.minute
    plus = session_time + 3.minute
    trip = where(vehicle_id: vehicle.id).where('start_time >= ? AND start_time <= ?', minus, plus).take

    trip || create(vehicle_id: vehicle.id, start_time: session_time)
  end

  def calculate_distance
    Trip.select(<<-EOF).take&.calculated_distance
(
  SELECT
    st_length(st_makeline(point)::geography)
  FROM
    (SELECT st_makepoint(longitude, latitude) as point FROM entries WHERE trip_id = trips.id AND
      longitude IS NOT NULL AND latitude IS NOT NULL
    ORDER BY device_time) a
) as calculated_distance
    EOF
  end
end
