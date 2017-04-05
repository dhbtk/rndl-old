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

class Landmark < ApplicationRecord
  validates :name, :location, :color, presence: true
end
