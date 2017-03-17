import * as types from '../actions/types';
import initialState from './initialState';
import IAction from "../actions/types";

export function loading(state: boolean = initialState.loading, action: IAction<boolean>): boolean {
    switch (action.type) {
        case types.START_LOADING:
            return true;
        case types.STOP_LOADING:
            return false;
        default:
            return state;
    }
}
