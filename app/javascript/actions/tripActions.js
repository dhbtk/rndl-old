import tripApi from '../api/TripApi';
import {startLoading, stopLoading} from './loadingActions';
import * as types from './types';

export function loadTrips(date, vehicleId) {
    return function(dispatch) {
        dispatch(startLoading());
        return tripApi.getAllTrips(date, vehicleId).then(trips => {
            dispatch(stopLoading());
            dispatch(loadTripsSuccess(trips))
        }).catch(error => {
            dispatch(stopLoading());
            throw(error);
        });
    }
}

export function loadTripsSuccess(trips) {
    return { type: types.LOAD_TRIPS_SUCCESS, trips };
}

export function loadTrip(id) {
    return function(dispatch) {
        dispatch(startLoading());
        return tripApi.getTrip(id).then(trip => {
            dispatch(stopLoading());
            dispatch(loadTripSuccess(trip))
        }).catch(error => {
            dispatch(stopLoading());
            throw(error);
        });
    }
}

export function loadTripSuccess(trip) {
    return { type: types.LOAD_TRIP_SUCCESS, trip };
}
