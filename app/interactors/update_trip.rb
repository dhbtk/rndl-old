class UpdateTrip
  include Interactor

  def call
    Trip.update_calculated_info(context.trip.id)
  end
end
