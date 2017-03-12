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
    found_trip = nil
    Trip.transaction do
      Trip.connection.execute('LOCK trips IN ACCESS EXCLUSIVE MODE')
      session_time = DateTime.strptime(time_ms, '%Q') + TIME_OFFSET
      minus = session_time - 3.minute
      plus = session_time + 3.minute
      trip = where(vehicle_id: vehicle.id).where('start_time >= ? AND start_time <= ?', minus, plus).take

      found_trip = trip || create(vehicle_id: vehicle.id, start_time: session_time)
    end
    found_trip
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

  def self.update_calculated_info(id)
    transaction do
      connection.execute <<-EOF
UPDATE trips SET
economy = (SELECT avg(instant_kml) FROM entries WHERE trip_id = trips.id),
average_speed = (SELECT avg(speed) FROM entries WHERE trip_id = trips.id),
max_speed = (SELECT max(speed) FROM entries WHERE trip_id = trips.id),
fuel_used = (SELECT max(fuel_used) FROM entries WHERE trip_id = trips.id),
distance = (
  SELECT
    st_length(st_makeline(point)::geography)
  FROM
    (SELECT st_makepoint(longitude, latitude) as point FROM entries WHERE trip_id = trips.id AND
      longitude IS NOT NULL AND latitude IS NOT NULL
    ORDER BY device_time) a
),
duration = (SELECT max(device_time) FROM entries WHERE trip_id = trips.id) - start_time,
updated_at = now()
      EOF
    end
  end
end
