class TripListSerializer < ActiveModel::Serializer
  attributes :id, :start_time, :distance, :average_speed, :max_speed, :economy, :duration
  has_one :vehicle, serializer: VehicleTripSerializer
end
