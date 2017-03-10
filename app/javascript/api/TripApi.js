import {authFetch} from '../auth';

export default class TripApi {
    static getAllTrips(date, vehicleId) {
        return authFetch(`/api/trips?date=${date}&vehicle_id=${vehicleId}`).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    static getTrip(id) {
        return authFetch(`/api/trips/${id}`).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }
}
