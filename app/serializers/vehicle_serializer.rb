class VehicleSerializer < ActiveModel::Serializer
  attributes :id, :name, :torque_id, :created_at, :updated_at
  has_one :latest_gps_entry, serializer: EntrySerializer
end
