# == Schema Information
#
# Table name: vehicles
#
#  created_at :datetime         not null
#  id         :integer          not null, primary key
#  name       :string           not null
#  torque_id  :string           not null
#  updated_at :datetime         not null
#

require 'test_helper'

class VehiclesControllerTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end
end
