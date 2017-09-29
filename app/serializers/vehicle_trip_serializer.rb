class VehicleTripSerializer < ActiveModel::Serializer
  attributes :id, :name, :torque_id, :tire_diameter, :gear_ratios, :final_drive, :created_at, :updated_at
end
