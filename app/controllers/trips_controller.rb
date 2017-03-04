class TripsController < ApplicationController
  def index
    date = Date.parse(params[:date])
    @dates = Trip.where('date(start_time) >= ? AND date(start_time) <= ?', date.beginning_of_month, date.end_of_month).group('date(start_time)').count
  end
end
