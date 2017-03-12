import {vehicles, vehicle} from "./vehicleReducer";
import {trips, trip} from "./tripReducer";
import {loading} from "./loadingReducer";
import {user, token} from "./authReducer";
import {flash} from "./flashReducer";
import {combineReducers} from "redux";

const rootReducer = combineReducers({
    loading,

    vehicles,
    vehicle,

    trips,
    trip,

    token,
    user,

    flash
});

export default rootReducer;
