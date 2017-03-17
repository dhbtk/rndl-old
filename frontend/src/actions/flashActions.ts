import IAction, * as types from './types';

export function pushNotice(notice: string): IAction<string> {
    return { type: types.PUSH_NOTICE, payload: notice };
}

export function popNotice(): IAction<null> {
    return { type: types.POP_NOTICE, payload: null };
}

export function pushError(error: string): IAction<string> {
    return { type: types.PUSH_ERROR, payload: error };
}

export function popError(): IAction<null> {
    return { type: types.POP_ERROR, payload: null };
}
