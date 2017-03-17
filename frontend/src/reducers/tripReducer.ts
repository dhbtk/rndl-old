import * as types from '../actions/types';
import initialState from './initialState';
import {ITrip, IDate} from "../models";
import IAction from "../actions/types";

export function trips(state: IDate[] = initialState.trips, action: IAction<IDate[]>): IDate[] {
    switch(action.type) {
        case types.LOAD_TRIPS_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}

export function trip(state: ITrip = initialState.trip, action: IAction<ITrip>): ITrip {
    switch(action.type) {
        case types.LOAD_TRIP_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}
