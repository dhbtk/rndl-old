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

class VehicleSerializer < ActiveModel::Serializer
  attributes :id, :name, :torque_id, :created_at, :updated_at
  has_one :latest_gps_entry, serializer: EntrySerializer
end
