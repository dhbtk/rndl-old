import vehicleApi from '../api/VehicleApi';
import {startLoading, stopLoading} from './loadingActions';
import * as types from './types';

export function loadVehicles() {
    return function(dispatch) {
        dispatch(startLoading());
        return vehicleApi.getAllVehicles().then(vehicles => {
            dispatch(stopLoading());
            dispatch(loadVehiclesSuccess(vehicles))
        }).catch(error => {
            dispatch(stopLoading());
            throw(error)
        });
    }
}

export function loadVehiclesSuccess(vehicles) {
    return { type: types.LOAD_VEHICLES_SUCCESS, vehicles };
}

export function loadVehicle(id) {
    return function(dispatch) {
        dispatch(startLoading());
        return vehicleApi.getVehicle(id).then(vehicle => {
            dispatch(stopLoading());
            dispatch(loadVehicleSuccess(vehicle))
        }).catch(error => {
            dispatch(stopLoading());
            throw(error);
        });
    }
}

export function loadVehicleSuccess(vehicle) {
    return { type: types.LOAD_VEHICLE_SUCCESS, vehicle };
}
