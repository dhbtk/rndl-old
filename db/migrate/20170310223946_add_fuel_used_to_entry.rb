class AddFuelUsedToEntry < ActiveRecord::Migration[5.1]
  def change
    add_column :entries, :fuel_used, :decimal, precision: 5, scale: 1
    add_column :trips, :fuel_used, :decimal, precision: 5, scale: 1

    execute 'UPDATE entries SET fuel_used = 0;'
    execute 'UPDATE trips SET fuel_used = (1/economy)*(distance/1000) WHERE economy <> 0;'
  end
end
