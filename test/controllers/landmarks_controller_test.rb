# == Schema Information
#
# Table name: landmarks
#
#  color       :string           not null
#  created_at  :datetime         not null
#  description :text
#  id          :integer          not null, primary key
#  location    :geometry({:srid= not null, point, 0
#  name        :string           not null
#  notify      :boolean          default(FALSE), not null
#  updated_at  :datetime         not null
#

require 'test_helper'

class LandmarksControllerTest < ActionDispatch::IntegrationTest
  setup do
    @landmark = landmarks(:one)
  end

  test "should get index" do
    get landmarks_url, as: :json
    assert_response :success
  end

  test "should create landmark" do
    assert_difference('Landmark.count') do
      post landmarks_url, params: { landmark: { color: @landmark.color, description: @landmark.description, location: @landmark.location, name: @landmark.name, notify: @landmark.notify } }, as: :json
    end

    assert_response 201
  end

  test "should show landmark" do
    get landmark_url(@landmark), as: :json
    assert_response :success
  end

  test "should update landmark" do
    patch landmark_url(@landmark), params: { landmark: { color: @landmark.color, description: @landmark.description, location: @landmark.location, name: @landmark.name, notify: @landmark.notify } }, as: :json
    assert_response 200
  end

  test "should destroy landmark" do
    assert_difference('Landmark.count', -1) do
      delete landmark_url(@landmark), as: :json
    end

    assert_response 204
  end
end
