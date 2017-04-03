class VehicleTripSerializer < ActiveModel::Serializer
  attributes :id, :name, :torque_id, :created_at, :updated_at
end
