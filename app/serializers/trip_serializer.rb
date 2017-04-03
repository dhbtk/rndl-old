class TripSerializer < ActiveModel::Serializer
  attributes :id, :start_time, :distance, :average_speed, :max_speed, :economy, :duration
  has_many :entries
  has_many :map_points
end
