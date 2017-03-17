import {Action} from "redux";
export const START_LOADING: string = 'START_LOADING';
export const STOP_LOADING: string = 'STOP_LOADING';

export const PUSH_NOTICE: string = 'PUSH_NOTICE';
export const POP_NOTICE: string = 'POP_NOTICE';
export const PUSH_ERROR: string = 'PUSH_ERROR';
export const POP_ERROR: string = 'POP_ERROR';

export const LOAD_VEHICLES_SUCCESS: string = 'LOAD_VEHICLES_SUCCESS';
export const LOAD_VEHICLE_SUCCESS: string = 'LOAD_VEHICLE_SUCCESS';

export const LOAD_TRIPS_SUCCESS: string = 'LOAD_TRIPS_SUCCESS';
export const LOAD_TRIP_SUCCESS: string = 'LOAD_TRIP_SUCCESS';

interface IAction<P> extends Action {
    type: string,
    payload: P
}

export default IAction;
