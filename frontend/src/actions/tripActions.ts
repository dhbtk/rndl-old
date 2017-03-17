import tripApi from '../api/TripApi';
import {startLoading, stopLoading} from './loadingActions';
import * as types from './types';
import {ThunkAction} from "redux-thunk";
import IAction from "./types";
import {IState, ITrip, IDate} from "../models";
import {Dispatch} from "react-redux";

export function loadTrips(date: string, vehicleId: number): ThunkAction<Promise<void>,IState, void> {
    return (dispatch: Dispatch<IState>) => {
        dispatch(startLoading());
        return tripApi.getAllTrips(date, vehicleId).then((trips: IDate[]) => {
            console.log(trips);
            dispatch(stopLoading());
            dispatch(loadTripsSuccess(trips))
        }).catch(error => {
            dispatch(stopLoading());
            throw(error);
        });
    }
}

export function loadTripsSuccess(trips: IDate[]): IAction<IDate[]> {
    return {type: types.LOAD_TRIPS_SUCCESS, payload: trips};
}

export function loadTrip(id: number): ThunkAction<Promise<void>, IState, void> {
    return (dispatch: Dispatch<IState>) => {
        dispatch(startLoading());
        return tripApi.getTrip(id).then((trip: ITrip) => {
            dispatch(stopLoading());
            dispatch(loadTripSuccess(trip))
        }).catch(error => {
            dispatch(stopLoading());
            throw(error);
        });
    }
}

export function loadTripSuccess(trip: ITrip): IAction<ITrip> {
    return {type: types.LOAD_TRIP_SUCCESS, payload: trip};
}
