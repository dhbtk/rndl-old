# == Schema Information
#
# Table name: entries
#
#  altitude         :decimal(5, 1)
#  created_at       :datetime         not null
#  device_time      :datetime         not null
#  fuel_flow        :decimal(7, 1)
#  fuel_used        :decimal(5, 1)
#  gps_speed        :decimal(5, 2)
#  id               :integer          not null, primary key
#  instant_kml      :decimal(3, 1)
#  kml              :decimal(4, 2)
#  latitude         :decimal(10, 8)
#  longitude        :decimal(10, 8)
#  rpm              :decimal(7, 2)
#  speed            :integer
#  throttle_percent :decimal(5, 2)    default(0.0)
#  trip_id          :integer          not null
#  updated_at       :datetime         not null
#
# Indexes
#
#  index_entries_on_trip_id  (trip_id)
#

class Entry < ApplicationRecord
  belongs_to :trip

  def gear
    if speed.nil? || rpm.nil? || speed < 1
      nil
    else
      # 0.22*2.54 = tire diameter (22 inches * 2.54 / 100) in meters
      # 4.93 = final drive ratio
      ratio = (60*rpm*0.22*2.54*3.1415)/(4.93*1000*speed)
      gear = trip.vehicle.gear_ratios.to_enum.with_index.map do |g, i|
        [g - 0.1, g + 0.1, i + 1]
      end.select do |gear|
        min, max, num = gear
        ratio >= min && ratio <= max
      end.first
      gear.nil? ? '' : gear[2]
    end
  end
end
