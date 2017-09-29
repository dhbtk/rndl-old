class AddTireDiameterToVehicle < ActiveRecord::Migration[5.0]
  def change
    add_column :vehicles, :tire_diameter, :decimal, precision: 8, scale: 4, default: 1
  end
end
