import {vehicles, vehicle} from "./vehicleReducer";
import {trips, trip} from "./tripReducer";
import {loading} from "./loadingReducer";
import {user, token} from "./authReducer";
import {combineReducers} from "redux";

const rootReducer = combineReducers({
    loading,

    vehicles,
    vehicle,

    trips,
    trip,

    token,
    user
});

export default rootReducer;
