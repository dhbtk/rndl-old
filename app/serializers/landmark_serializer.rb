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

class LandmarkSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :notify, :location, :color
end
