class TripsController < ApplicationController
  before_action :authenticate_user!
  def index
    date = Date.parse(params[:date])
    @dates = Trip
                 .select('trips.*, date(start_time) as start_date').includes(:vehicle)
                 .where('date(start_time) BETWEEN :start AND :end', start: date.beginning_of_month, end: date.end_of_month)
                 .order('date(start_time) DESC, start_time ASC')
    @dates = @dates.where(vehicle_id: params[:vehicle_id]) if params[:vehicle_id].present?
    @dates = @dates.to_a.group_by{|d| d.start_date}.map{|k,v| {trip_date: k, count: v.count, trips: v.map{|t| TripListSerializer.new(t)}}}
    render json: @dates
  end

  def show
    @trip = Trip.find(params[:id])
    render json: @trip
  end
end
