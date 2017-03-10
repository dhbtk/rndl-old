class ConvertTripTimesToLocalTime < ActiveRecord::Migration[5.1]
  def change
  	  execute <<-EOF
  	  UPDATE entries SET device_time = device_time - INTERVAL '3 hours' WHERE date(device_time) >= '2017-02-19';
  	  EOF
  	  execute <<-EOF
  	  UPDATE entries SET device_time = device_time - INTERVAL '2 hours' WHERE date(device_time) < '2017-02-19';
  	  EOF
  	  execute <<-EOF
  	  UPDATE trips SET start_time = start_time - INTERVAL '3 hours' WHERE date(start_time) >= '2017-02-19';
  	  EOF
  	  execute <<-EOF
  	  UPDATE trips SET start_time = start_time - INTERVAL '3 hours' WHERE date(start_time) < '2017-02-19';
  	  EOF
  end
end
