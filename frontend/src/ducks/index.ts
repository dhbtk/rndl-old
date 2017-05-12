import {vehicles, vehicle} from "./vehicle";
import {trips, trip} from "./trip";
import loading from "./loading";
import {user, token} from "@edanniehues/devise-token-auth-redux/reducers";
import flash from "./flash";
import {combineReducers, Reducer} from "redux";
import {IState} from "../models";
import { newRefueling, refueling, refuelings } from './refueling';
import { combineForms } from 'react-redux-form';
import moment = require('moment');

const reducers = {
    loading,

    vehicles,
    vehicle,

    trips,
    trip,

    refuelings,
    refueling,
    newRefueling,

    token,
    user,

    flash,

    form: combineForms({
        newRefueling: {
            date: moment().format('YYYY-MM-DD'),
            liter_price: '',
            liters: '',
            odometer: '',
            total_cost: ''
        },
        refueling: {
            date: '',
            liter_price: '',
            liters: '',
            odometer: '',
            total_cost: ''
        }
    }, 'form')
};

const rootReducer: Reducer<IState> = combineReducers<IState>(reducers);

export default rootReducer;
