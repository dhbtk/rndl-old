# == Schema Information
#
# Table name: refuelings
#
#  created_at  :datetime         not null
#  date        :datetime         not null
#  id          :integer          not null, primary key
#  liter_price :decimal(5, 3)
#  liters      :decimal(5, 3)
#  odometer    :decimal(5, 1)
#  total_cost  :decimal(7, 3)
#  updated_at  :datetime         not null
#  vehicle_id  :integer          not null
#
# Indexes
#
#  index_refuelings_on_vehicle_id  (vehicle_id)
#

require 'test_helper'

class RefuelingsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @refueling = refuelings(:one)
  end

  test "should get index" do
    get refuelings_url, as: :json
    assert_response :success
  end

  test "should create refueling" do
    assert_difference('Refueling.count') do
      post refuelings_url, params: { refueling: { date: @refueling.date, liter_price: @refueling.liter_price, liters: @refueling.liters, odometer: @refueling.odometer, total_cost: @refueling.total_cost, vehicle_id: @refueling.vehicle_id } }, as: :json
    end

    assert_response 201
  end

  test "should show refueling" do
    get refueling_url(@refueling), as: :json
    assert_response :success
  end

  test "should update refueling" do
    patch refueling_url(@refueling), params: { refueling: { date: @refueling.date, liter_price: @refueling.liter_price, liters: @refueling.liters, odometer: @refueling.odometer, total_cost: @refueling.total_cost, vehicle_id: @refueling.vehicle_id } }, as: :json
    assert_response 200
  end

  test "should destroy refueling" do
    assert_difference('Refueling.count', -1) do
      delete refueling_url(@refueling), as: :json
    end

    assert_response 204
  end
end
