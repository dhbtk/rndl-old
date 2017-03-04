class AddDurationToTrip < ActiveRecord::Migration[5.1]
  def change
    add_column :trips, :duration, :time
  end
end
