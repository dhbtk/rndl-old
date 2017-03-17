import * as types from '../actions/types'
import initialState from './initialState';
import {IVehicle} from "../models";
import IAction from "../actions/types";

export function vehicles(state: IVehicle[] = initialState.vehicles, action: IAction<IVehicle[]>): IVehicle[] {
    switch(action.type) {
        case types.LOAD_VEHICLES_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}

export function vehicle(state: IVehicle = initialState.vehicle, action: IAction<IVehicle>): IVehicle {
    switch(action.type) {
        case types.LOAD_VEHICLE_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}
