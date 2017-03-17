json.extract! trip, :id, :start_time, :distance, :average_speed, :max_speed, :economy, :duration
json.vehicle json.partial!('vehicles/vehicle', vehicle: trip.vehicle)
