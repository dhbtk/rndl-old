class AddTimestampMsToTrip < ActiveRecord::Migration[5.1]
  def change
    add_column :trips, :timestamp_ms, :bigint

    execute <<-EOF
UPDATE trips SET timestamp_ms = (extract(epoch from start_time)*1000)::bigint
EOF
	
	change_column_null :trips, :timestamp_ms, false
	add_index :trips, [:vehicle_id, :timestamp_ms], unique: true
  end
end
