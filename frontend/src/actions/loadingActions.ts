import IAction, * as types from './types';

export function startLoading(): IAction<null> {
    return { type: types.START_LOADING, payload: null };
}

export function stopLoading(): IAction<null> {
    return { type: types.STOP_LOADING, payload: null };
}
