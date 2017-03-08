import vehicleApi from '../api/VehicleApi';
import * as types from './types';

export function loadVehicles() {
    return function(dispatch) {
        return vehicleApi.getAllVehicles().then(vehicles => dispatch(loadVehiclesSuccess(vehicles))).catch(error => {
            throw(error)
        });
    }
}

export function loadVehiclesSuccess(vehicles) {
    return { type: types.LOAD_VEHICLES_SUCCESS, vehicles };
}

export function loadVehicle(id) {
    return function(dispatch) {
        return vehicleApi.getVehicle(id).then(vehicle => dispatch(loadVehicleSuccess(vehicle))).catch(error => {
            throw(error);
        });
    }
}

export function loadVehicleSuccess(vehicle) {
    return { type: types.LOAD_VEHICLE_SUCCESS, vehicle };
}
