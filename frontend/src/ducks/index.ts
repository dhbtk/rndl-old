import {vehicles, vehicle} from "./vehicle";
import {trips, trip} from "./trip";
import loading from "./loading";
import {user, token} from "@edanniehues/devise-token-auth-redux/reducers";
import flash from "./flash";
import {combineReducers, Reducer} from "redux";
import {IState} from "../models";

const rootReducer: Reducer<IState> = combineReducers<IState>({
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
