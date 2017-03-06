# == Schema Information
#
# Table name: entries
#
#  altitude    :decimal(5, 1)
#  created_at  :datetime         not null
#  device_time :datetime         not null
#  gps_speed   :decimal(5, 2)
#  id          :integer          not null, primary key
#  kml         :decimal(4, 2)
#  latitude    :decimal(10, 8)
#  longitude   :decimal(10, 8)
#  rpm         :decimal(7, 2)
#  speed       :integer
#  trip_id     :integer          not null
#  updated_at  :datetime         not null
#
# Indexes
#
#  index_entries_on_trip_id  (trip_id)
#

class Entry < ApplicationRecord
  belongs_to :trip
end
