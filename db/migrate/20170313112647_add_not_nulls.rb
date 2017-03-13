class AddNotNulls < ActiveRecord::Migration[5.1]
  def change
  	  change_column_null :vehicles, :name, false
  	  change_column_null :vehicles, :torque_id, false

  	  change_column_null :trips, :vehicle_id, false
  	  change_column_null :trips, :start_time, false
  end
end
