import { vehicle, vehicles } from './vehicle';
import { trip, trips } from './trip';
import loading from './loading';
import { token, user } from '@edanniehues/devise-token-auth-redux/reducers';
import flash from './flash';
import { combineReducers, Reducer } from 'redux';
import { IState } from '../models';
import { refuelings } from './refueling';
import { combineForms } from 'react-redux-form';
import moment = require('moment');

const reducers = {
    loading,

    vehicles,
    vehicle,

    trips,
    trip,

    refuelings,

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
        },
        vehicle: {
            id: '',
            name: '',
            torque_id: ''
        }
    }, 'form')
};

const rootReducer: Reducer<IState> = combineReducers<IState>(reducers);

export default rootReducer;
