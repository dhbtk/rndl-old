import * as types from '../actions/types'
import initialState from './initialState';

export function vehicles(state = initialState.vehicles, action) {
    switch(action.type) {
        case types.LOAD_VEHICLES_SUCCESS:
            return action.vehicles;
        default:
            return state;
    }
}

export function vehicle(state = initialState.vehicle, action) {
    switch(action.type) {
        case types.LOAD_VEHICLE_SUCCESS:
            return action.vehicle;
        default:
            return state;
    }
}
