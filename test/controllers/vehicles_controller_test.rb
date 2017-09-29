# == Schema Information
#
# Table name: vehicles
#
#  created_at    :datetime         not null
#  final_drive   :decimal(4, 2)    default(1.0)
#  gear_ratios   :decimal(, )      default([]), is an Array
#  id            :integer          not null, primary key
#  name          :string           not null
#  tire_diameter :decimal(8, 4)    default(1.0)
#  torque_id     :string           not null
#  updated_at    :datetime         not null
#

require 'test_helper'

class VehiclesControllerTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end
end
