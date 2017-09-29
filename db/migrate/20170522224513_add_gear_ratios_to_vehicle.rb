class AddGearRatiosToVehicle < ActiveRecord::Migration[5.0]
  def change
    add_column :vehicles, :gear_ratios, :decimal, precision: 4, scale: 2, array: true, default: []
    add_column :vehicles, :final_drive, :decimal, precision: 4, scale: 2, default: 1
  end
end
