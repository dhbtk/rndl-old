import * as types from '../actions/types';
import initialState from './initialState';

export function user(state = initialState.user, action) {
    switch(action.type) {
        case types.RESET_USER:
            return {};
        case types.LOAD_USER_FAILED:
            return null;
        case types.LOAD_USER_SUCCESS:
            return action.user;
        default:
            return state;
    }
}

export function token(state = initialState.token, action) {
    switch(action.type) {
        case types.TOKEN_REFRESH_SUCCESS:
            return action.token;
        default:
            return state;
    }
}
