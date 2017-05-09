import IAction from '../action';
import initialState from './initialState';

const START_LOADING: string = 'START_LOADING';
const STOP_LOADING: string = 'STOP_LOADING';

export default function reducer(state: boolean = initialState.loading, action: IAction<boolean>): boolean {
    switch (action.type) {
        case START_LOADING:
            return true;
        case STOP_LOADING:
            return false;
        default:
            return state;
    }
}

export function startLoading(): IAction<null> {
    return { type: START_LOADING, payload: null };
}

export function stopLoading(): IAction<null> {
    return { type: STOP_LOADING, payload: null };
}

