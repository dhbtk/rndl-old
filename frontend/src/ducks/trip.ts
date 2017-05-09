import * as types from '../action';
import initialState from './initialState';
import { ITrip, IDate, IState } from '../models';
import IAction from "../action";
import { authFetch } from '@edanniehues/devise-token-auth-redux';
import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'react-redux';
import { startLoading, stopLoading } from './loading';

const LOAD_TRIPS_SUCCESS: string = 'LOAD_TRIPS_SUCCESS';
const LOAD_TRIP_SUCCESS: string = 'LOAD_TRIP_SUCCESS';

export function trips(state: IDate[] = initialState.trips, action: IAction<IDate[]>): IDate[] {
    switch(action.type) {
        case LOAD_TRIPS_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}

export function trip(state: ITrip = initialState.trip, action: IAction<ITrip>): ITrip {
    switch(action.type) {
        case LOAD_TRIP_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}

export function loadTrips(date: string, vehicleId: number): ThunkAction<Promise<void>,IState, void> {
    return (dispatch: Dispatch<IState>) => {
        dispatch(startLoading());
        return getAllTrips(date, vehicleId).then((trips: IDate[]) => {
            console.log(trips);
            dispatch(stopLoading());
            dispatch(loadTripsSuccess(trips))
        }).catch((error: any) => {
            dispatch(stopLoading());
            throw(error);
        });
    }
}

export function loadTripsSuccess(trips: IDate[]): IAction<IDate[]> {
    return {type: LOAD_TRIPS_SUCCESS, payload: trips};
}

export function loadTrip(id: number): ThunkAction<Promise<void>, IState, void> {
    return (dispatch: Dispatch<IState>) => {
        dispatch(startLoading());
        return getTrip(id).then((trip: ITrip) => {
            dispatch(stopLoading());
            dispatch(loadTripSuccess(trip))
        }).catch((error: any) => {
            dispatch(stopLoading());
            throw(error);
        });
    }
}

export function loadTripSuccess(trip: ITrip): IAction<ITrip> {
    return {type: LOAD_TRIP_SUCCESS, payload: trip};
}


function getAllTrips(date: string, vehicleId: number): Promise<IDate[]> {
    return authFetch(`/api/trips?date=${date}&vehicle_id=${vehicleId}`).then((response: Response) => {
        return response.json();
    }).catch((error: any) => {
        return error;
    });
}

function getTrip(id: number): Promise<ITrip> {
    return authFetch(`/api/trips/${id}`).then((response: Response) => {
        return response.json();
    }).catch((error: any) => {
        return error;
    });
}