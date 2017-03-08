import * as types from '../actions/types';
import initialState from './initialState';

export function trips(state = initialState.trips, action) {
    switch(action.type) {
        case types.LOAD_TRIPS_SUCCESS:
            return action.trips;
        default:
            return state;
    }
}

export function trip(state = initialState.trip, action) {
    switch(action.type) {
        case types.LOAD_TRIP_SUCCESS:
            return action.trip;
        default:
            return state;
    }
}
