class TripsController < ApplicationController
  before_action :authenticate_user!
  def index
    date = Date.parse(params[:date])
    @dates = Trip.where('date(start_time) >= ? AND date(start_time) <= ?', date.beginning_of_month, date.end_of_month).group('date(start_time)').order('date(start_time) desc').count.to_a
    render json: @dates.map{|d| {trip_date: d[0], count: d[1], trips: Trip.by_filters(d[0], params[:vehicle_id]).map{|t| TripListSerializer.new(t)}}}
  end

  def show
    @trip = Trip.find(params[:id])
    render json: @trip
  end
end
