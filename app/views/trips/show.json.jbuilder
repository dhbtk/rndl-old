json.partial! 'trips/trip', trip: @trip
json.map_points @trip.entries.where.not(longitude: nil, latitude: nil).order(:device_time), partial: 'entries/entry', as: :entry
