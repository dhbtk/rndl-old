export default class VehicleApi {
    static getAllVehicles() {
        return fetch(`/api/vehicles`).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    static getVehicle(id) {
        return fetch(`/api/vehicles/${id}`).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }
}
