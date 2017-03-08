import {vehicles, vehicle} from './vehicleReducer';
import {trips, trip} from './tripReducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    vehicles,
    vehicle,
    trips,
    trip
});

export default rootReducer;
