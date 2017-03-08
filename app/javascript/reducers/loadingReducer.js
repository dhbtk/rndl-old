import * as types from '../actions/types';
import initialState from './initialState';

export function loading(state = initialState.loading, action) {
    switch (action.type) {
        case types.START_LOADING:
            return true;
        case types.STOP_LOADING:
            return false;
        default:
            return state;
    }
}
