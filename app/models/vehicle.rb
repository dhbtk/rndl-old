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

class Vehicle < ApplicationRecord
  has_many :trips
  has_many :entries, through: :trips

  def latest_gps_entry
    entries.unscope(:order).where.not(longitude: nil, latitude: nil).order(device_time: :desc).take
  end
end
