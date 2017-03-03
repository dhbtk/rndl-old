class CreateEntries < ActiveRecord::Migration[5.1]
  def change
    create_table :entries do |t|
      t.references :trip, foreign_key: true, null: false
      t.timestamp :device_time, null: false
      t.decimal :latitude, precision: 10, scale: 8
      t.decimal :longitude, precision: 10, scale: 8
      t.decimal :gps_speed, precision: 5, scale: 2
      t.decimal :altitude, precision: 5, scale: 1
      t.decimal :rpm, precision: 7, scale: 2
      t.decimal :kml, precision: 4, scale: 2
      t.integer :speed

      t.timestamps
    end
  end
end
