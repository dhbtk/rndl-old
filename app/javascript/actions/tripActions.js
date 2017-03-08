import tripApi from '../api/TripApi';
import * as types from './types';

export function loadTrips(date, vehicleId) {
    return function(dispatch) {
        return tripApi.getAllTrips(date, vehicleId).then(trips => dispatch(loadTripsSuccess(trips))).catch(error => {
            throw(error);
        });
    }
}

export function loadTripsSuccess(trips) {
    return { type: types.LOAD_TRIPS_SUCCESS, trips };
}

export function loadTrip(id) {
    return function(dispatch) {
        return tripApi.getTrip(id).then(trip => dispatch(loadTripSuccess(trip))).catch(error => {
            throw(error);
        });
    }
}

export function loadTripSuccess(trip) {
    return { type: types.LOAD_TRIP_SUCCESS, trip };
}
