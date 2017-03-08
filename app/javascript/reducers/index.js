import {vehicles, vehicle} from "./vehicleReducer";
import {trips, trip} from "./tripReducer";
import {loading} from "./loadingReducer";
import {combineReducers} from "redux";

const rootReducer = combineReducers({
    loading,

    vehicles,
    vehicle,

    trips,
    trip
});

export default rootReducer;
