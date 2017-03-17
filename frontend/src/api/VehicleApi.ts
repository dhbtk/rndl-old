import {authFetch} from '@edanniehues/devise-token-auth-redux';
import {IVehicle} from "../models";

export default class VehicleApi {
    static getAllVehicles(): Promise<IVehicle[]> {
        return authFetch(`/api/vehicles`).then((response: any) => {
            return response.json();
        }).catch((error: any) => {
            return error;
        });
    }

    static getVehicle(id: number) {
        return authFetch(`/api/vehicles/${id}`).then((response: any) => {
            return response.json();
        }).catch((error: any) => {
            return error;
        });
    }
}
