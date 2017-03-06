json.array! @dates do |date|
  json.trip_date date[0]
  json.count date[1]
  json.trips Trip.where('date(start_time) = ?', date[0]).order(:start_time).includes(:vehicle), partial: 'trips/trip', as: :trip
end
