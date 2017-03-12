class SendRealTimeVehiclePosition
  include Interactor

  def call
    ActionCable.server.broadcast('vehicle_real_time', id: context.trip.vehicle.id, entry: context.entry)
  end
end
