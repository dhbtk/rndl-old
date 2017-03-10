class AddThrottlePercentAndInstantKmlToEntry < ActiveRecord::Migration[5.1]
  def change
    add_column :entries, :throttle_percent, :decimal, precision: 5, scale: 2, default: 0
    add_column :entries, :instant_kml, :decimal, precision: 3, scale: 1
    add_column :entries, :fuel_flow, :decimal, precision: 7, scale: 1

    execute('UPDATE entries SET instant_kml = kml, fuel_flow = (((1/kml)*1000) * speed/60) WHERE kml <> 0;')
  end
end
