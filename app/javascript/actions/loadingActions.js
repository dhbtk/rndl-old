import * as types from './types';

export function startLoading() {
    return { type: types.START_LOADING };
}

export function stopLoading() {
    return { type: types.STOP_LOADING };
}
