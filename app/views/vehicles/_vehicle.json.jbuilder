json.extract! vehicle, :id, :name, :torque_id, :created_at
json.latest_gps_entry do
  json.partial!(vehicle.latest_gps_entry)
end

