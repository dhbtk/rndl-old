json.array! @dates do |date|
  json.trip_date date[0]
  json.count date[1]
  json.trips do
    json.array!(Trip.where('date(start_time) = ?', date[0]).order(:start_time)) do |trip|
      json.extract! trip, :id, :start_time, :distance, :average_speed, :max_speed, :economy, :duration
      json.vehicle trip.vehicle.name
    end
  end
end
