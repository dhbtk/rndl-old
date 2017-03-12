import * as types from './types';

export function pushNotice(notice) {
    return { type: types.PUSH_NOTICE, notice };
}

export function popNotice() {
    return { type: types.POP_NOTICE };
}

export function pushError(error) {
    return { type: types.PUSH_ERROR, error };
}

export function popError() {
    return { type: types.POP_ERROR };
}
