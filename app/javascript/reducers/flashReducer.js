import * as types from '../actions/types';
import initialState from './initialState';

export function flash(state = initialState.flash, action) {
    switch(action.type) {
        case types.PUSH_NOTICE:
            return { type: "info", text: action.notice };
        case types.PUSH_ERROR:
            return { type: "danger", text: action.error };
        case types.POP_NOTICE:
        case types.POP_ERROR:
            return null;
        default:
            return state;
    }
}
