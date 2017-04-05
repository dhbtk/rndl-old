class CreateLandmarks < ActiveRecord::Migration[5.0]
  def change
    create_table :landmarks do |t|
      t.string :name, null: false
      t.text :description
      t.boolean :notify, null: false, default: false
      t.st_point :location, geography: true, null: false
      t.string :color, null: false

      t.timestamps
    end
  end
end
