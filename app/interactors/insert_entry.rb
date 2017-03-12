class InsertEntry
  include Interactor

  def call
    Entry.transaction do
      params = context.params
      context.trip = Trip.find_by_vehicle_within(Vehicle.find_by!(torque_id: context.params[:id]), context.params[:session])
      context.entry = Entry.create({
                                       trip: context.trip,
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
    end
  end
end
