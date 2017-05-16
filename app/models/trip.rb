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
#  start_time    :datetime         not null
#  timestamp_ms  :integer          not null
#  updated_at    :datetime         not null
#  vehicle_id    :integer          not null
#
# Indexes
#
#  index_trips_on_vehicle_id                   (vehicle_id)
#  index_trips_on_vehicle_id_and_timestamp_ms  (vehicle_id,timestamp_ms) UNIQUE
#

class Trip < ApplicationRecord
  TIME_OFFSET = 0

  belongs_to :vehicle
  has_many :entries, -> { order(:device_time) }, dependent: :delete_all
  has_many :map_points, -> { where.not(longitude: nil, latitude: nil).order(:device_time) }, class_name: 'Entry', dependent: :restrict_with_error

  def self.find_by_vehicle_within(vehicle, time_ms)
    found_trip = nil
    Trip.transaction do
      Trip.connection.execute('LOCK trips IN ACCESS EXCLUSIVE MODE')
      session_time = DateTime.strptime(time_ms, '%Q') + TIME_OFFSET
      found_trip = create_with(start_time: session_time).find_or_create_by(vehicle_id: vehicle.id, timestamp_ms: time_ms)
    end
    found_trip
  end

  def self.by_filters(date, vehicle_id)
    query = where('date(start_time) = ?', date)
    query = query.where(vehicle_id: vehicle_id) if vehicle_id.present?
    query.order(:start_time)
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
economy = (SELECT avg(instant_kml) FROM entries WHERE trip_id = trips.id AND rpm > 0),
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
WHERE id = '#{id}'
      EOF
      connection.execute <<-EOF
UPDATE trips SET
economy = ((distance)/1000)/fuel_used
WHERE id = '#{id}'
EOF
    end
  end
end
