import vehicleApi from '../api/VehicleApi';
import {startLoading, stopLoading} from './loadingActions';
import * as types from './types';
import {ThunkAction} from "redux-thunk";
import {IState, IVehicle} from "../models";
import {Dispatch} from "react-redux";
import IAction from "./types";

export function loadVehicles(): ThunkAction<Promise<void>,IState,void> {
    return (dispatch: Dispatch<IState>) => {
        dispatch(startLoading());
        return vehicleApi.getAllVehicles().then((vehicles: IVehicle[]) => {
            dispatch(stopLoading());
            dispatch(loadVehiclesSuccess(vehicles))
        }).catch((error: any) => {
            dispatch(stopLoading());
            throw(error)
        });
    }
}

export function loadVehiclesSuccess(vehicles: IVehicle[]): IAction<IVehicle[]> {
    return { type: types.LOAD_VEHICLES_SUCCESS, payload: vehicles };
}

export function loadVehicle(id: number): ThunkAction<Promise<void>,IState,void> {
    return (dispatch: Dispatch<IState>) => {
        dispatch(startLoading());
        return vehicleApi.getVehicle(id).then((vehicle: IVehicle) => {
            dispatch(stopLoading());
            dispatch(loadVehicleSuccess(vehicle))
        }).catch((error: any) => {
            dispatch(stopLoading());
            throw(error);
        });
    }
}

export function loadVehicleSuccess(vehicle: IVehicle): IAction<IVehicle> {
    return { type: types.LOAD_VEHICLE_SUCCESS, payload: vehicle };
}
