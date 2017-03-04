class EntriesController < ApplicationController

  def create
    Entry.transaction do
      vehicle = Vehicle.create_with(name: 'Veículo Desconhecido').find_or_create_by(torque_id: params[:id])
      trip = Trip.find_by_vehicle_within(vehicle, params[:session])

      entry = Entry.create({
                               trip: trip,
                               device_time: DateTime.strptime(params[:time], '%Q') + Trip::TIME_OFFSET,
                               longitude: params['kff1005'],
                               latitude: params['kff1006'],
                               gps_speed: params['kff1001'],
                               rpm: params['kc'],
                               kml: params['kff1206'],
                               speed: params['kd']
                           })
      trip.update({
                      distance: trip.calculate_distance,
                      economy: trip.entries.order(device_time: :desc).limit(1).take.kml,
                      average_speed: trip.entries.average(:speed),
                      max_speed: trip.entries.maximum(:speed)
                  })

      Trip.connection.execute <<-EOF
UPDATE trips SET duration =
(
  select (select device_time from entries where trip_id = trips.id order by device_time desc limit 1) - start_time
)
WHERE trips.id = #{trip.id}
      EOF

      render html: 'OK!'
    end
  end
end
