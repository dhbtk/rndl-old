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

class Vehicle < ApplicationRecord
  has_many :trips, dependent: :destroy
  has_many :refuelings, dependent: :delete_all
  has_many :entries, through: :trips

  def latest_gps_entry
    entries.unscope(:order).where.not(longitude: nil, latitude: nil).order(device_time: :desc).take
  end
end
