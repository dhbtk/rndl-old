json.extract! @trip, :id, :start_time, :economy, :average_speed, :max_speed, :distance
json.map_points do
  json.array! @trip.entries.where.not(longitude: nil, latitude: nil).order(:device_time) do |entry|
    json.extract! entry, :id, :trip_id, :device_time, :longitude, :latitude, :gps_speed, :altitude, :rpm, :kml, :speed
  end
end
