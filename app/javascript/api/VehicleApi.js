import {authFetch} from '@edanniehues/devise-token-auth-redux';

export default class VehicleApi {
    static getAllVehicles() {
        return authFetch(`/api/vehicles`).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    static getVehicle(id) {
        return authFetch(`/api/vehicles/${id}`).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }
}
