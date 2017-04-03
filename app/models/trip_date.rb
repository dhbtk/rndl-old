class TripDate
  attr_accessor :trip_date, :count, :trips

  def initialize(*args)
    @trip_date = args[0]
    @count = args[1]
    @trips = args[2]
  end
end
