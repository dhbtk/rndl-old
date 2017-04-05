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

class TripSerializer < ActiveModel::Serializer
  attributes :id, :start_time, :distance, :average_speed, :max_speed, :economy, :duration
  has_many :entries
  has_many :map_points
end
