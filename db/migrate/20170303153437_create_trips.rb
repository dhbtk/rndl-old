class CreateTrips < ActiveRecord::Migration[5.1]
  def change
    create_table :trips do |t|
      t.timestamp :start_time
      t.float :distance
      t.integer :average_speed
      t.integer :max_speed
      t.float :economy
      t.references :vehicle, foreign_key: true

      t.timestamps
    end
  end
end
