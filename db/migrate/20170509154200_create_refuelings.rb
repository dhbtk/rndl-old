class CreateRefuelings < ActiveRecord::Migration[5.0]
  def change
    create_table :refuelings do |t|
      t.references :vehicle, foreign_key: true, null: false
      t.timestamp :date, null: false
      t.numeric :liter_price, precision: 5, scale: 3
      t.numeric :liters, precision: 5, scale: 3
      t.numeric :total_cost, precision: 7, scale: 3
      t.numeric :odometer, precision: 5, scale: 1

      t.timestamps
    end
  end
end
