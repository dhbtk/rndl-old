import {authFetch} from "@edanniehues/devise-token-auth-redux";
import {ITrip, IDate} from "../models";

export default class TripApi {
    static getAllTrips(date: string, vehicleId: number): Promise<IDate[]> {
        return authFetch(`/api/trips?date=${date}&vehicle_id=${vehicleId}`).then((response: Response) => {
            return response.json();
        }).catch((error: any) => {
            return error;
        });
    }

    static getTrip(id: number): Promise<ITrip> {
        return authFetch(`/api/trips/${id}`).then((response: Response) => {
            return response.json();
        }).catch((error: any) => {
            return error;
        });
    }
}
