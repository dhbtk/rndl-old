class EntriesController < ApplicationController
  @@thread_lock = Mutex.new

  def create
    @@thread_lock.synchronize do
      Entry.transaction do
        vehicle = Vehicle.create_with(name: 'Veículo Desconhecido').find_or_create_by(torque_id: params[:id])
        trip = Trip.find_by_vehicle_within(vehicle, params[:session])

        e = Entry.create({
                         trip: trip,
                         device_time: DateTime.strptime(params[:time], '%Q') + Trip::TIME_OFFSET,
                         longitude: params['kff1005'],
                         latitude: params['kff1006'],
                         gps_speed: params['kff1001'],
                         rpm: params['kc'],
                         kml: params['kff1206'],
                         speed: params['kd'],
                         throttle_percent: params['k11'],
                         instant_kml: params['kff1203'],
                         fuel_flow: params['kff125a'],
                         fuel_used: params['kff1271']
                     })
        ActionCable.server.broadcast('test', id: vehicle.id, entry: e)
        render html: 'OK!'
      end
    end
  end
end
