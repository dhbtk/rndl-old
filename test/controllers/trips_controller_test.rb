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
#  updated_at    :datetime         not null
#  vehicle_id    :integer          not null
#
# Indexes
#
#  index_trips_on_vehicle_id  (vehicle_id)
#

require 'test_helper'

class TripsControllerTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end
end
