import { IRefueling, IState, Page } from '../models';
import initialState from './initialState';
import IAction from '../action';
import { authFetch } from '@edanniehues/devise-token-auth-redux';
import { ThunkAction } from 'redux-thunk';
import { startLoading, stopLoading } from './loading';
import { pushError, pushNotice } from './flash';
import {actions as formActions} from 'react-redux-form';

const LOAD_REFUELINGS_SUCCESS: string = 'LOAD_REFUELINGS_SUCCESS';
const LOAD_REFUELING_SUCCESS: string = 'LOAD_REFUELING_SUCCESS';
const NEW_REFUELING: string = 'NEW_REFUELING';
const CANCEL_REFUELING: string = 'CANCEL_REFUELING';
const CHANGE_NEW_REFUELING: string = 'CHANGE_NEW_REFUELING';

export function refuelings(state: Page<IRefueling> = initialState.refuelings, action: IAction<Page<IRefueling>>): Page<IRefueling> {
    switch (action.type) {
        case LOAD_REFUELINGS_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}

export function refueling(state: IRefueling = initialState.refueling, action: IAction<IRefueling>): IRefueling {
    switch (action.type) {
        case LOAD_REFUELING_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}

export function newRefueling(state: IRefueling = initialState.newRefueling, action: IAction<IRefueling>): IRefueling {
    switch (action.type) {
        case NEW_REFUELING:
            return state == null ? {
                id: null,
                vehicle_id: null,
                created_at: null,
                updated_at: null,
                date: new Date(),
                liter_price: null,
                liters: null,
                odometer: null,
                total_cost: null
            } : state;
        case CHANGE_NEW_REFUELING:
            return { ...action.payload };
        case CANCEL_REFUELING:
            return null;
        default:
            return state;

    }
}

export function loadRefuelingsSuccess(vehicles: Page<IRefueling>): IAction<Page<IRefueling>> {
    return { type: LOAD_REFUELINGS_SUCCESS, payload: vehicles };
}

export function addNewRefueling() {
    return { type: NEW_REFUELING };
}

export function changeNewRefueling(refueling: IRefueling) {
    return { type: CHANGE_NEW_REFUELING, payload: refueling };
}

export function loadRefuelings(vehicleId: number, page: number = 1): ThunkAction<Promise<void>, IState, void> {
    return dispatch => {
        dispatch(startLoading());
        return getAllRefuelings(vehicleId, page).then(vehicles => {
            dispatch(stopLoading());
            dispatch(loadRefuelingsSuccess(vehicles));
        }, error => {
            dispatch(stopLoading());
            throw(error);
        });
    };
}

function loadRefuelingSuccess(refueling: IRefueling): IAction<IRefueling> {
    return { type: LOAD_REFUELING_SUCCESS, payload: refueling };
}

export function loadRefueling(id: number): ThunkAction<Promise<void>, IState, void> {
    return dispatch => {
        dispatch(startLoading());
        return getRefueling(id).then(refueling => {
            dispatch(stopLoading());
            dispatch(loadRefuelingSuccess(refueling));
        }, error => {
            dispatch(stopLoading());
            throw(error);
        });
    };
}

export function createRefueling(refueling: IRefueling): ThunkAction<void, IState, void> {
    return dispatch => {
        dispatch(startLoading());
        authFetch(`/api/refuelings`, {
            method: 'POST',
            body: JSON.stringify({refueling: refueling}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response: Response) => {
            if(response.ok) {
                dispatch(formActions.reset('form.newRefueling'));
                dispatch(pushNotice('Abastecimento registrado.'));
                dispatch(loadRefuelings(refueling.vehicle_id, 1));
            } else if(response.status === 422) {
                dispatch(pushError('Por favor, corrija os erros e tente novamente.'));
                response.json().then(json => console.log(json));
            } else {
                dispatch(pushError('Não foi possível salvar por conta de um erro do servidor.'));
            }
            dispatch(stopLoading());
        }).catch((error: any) => {
            dispatch(pushError('Houve um erro de rede. Por favor, tente novamente.'));
            dispatch(stopLoading());
        });
    }
}

export function removeRefueling(refueling: IRefueling): ThunkAction<void, IState, void> {
    return dispatch => {
        dispatch(startLoading());
        authFetch(`/api/refuelings/${refueling.id}`, { method: 'DELETE' }).then((response: Response) => {
            if(response.ok) {
                dispatch(pushNotice('Abastecimento excluído.'));
                dispatch(loadRefuelings(refueling.vehicle_id, 1));
            } else {
                dispatch(pushError('Não foi possível excluir o abastecimento.'));
            }
            dispatch(stopLoading());
        });
    }
}




function getAllRefuelings(vehicleId: number, page: number): Promise<Page<IRefueling>> {
    return authFetch(`/api/refuelings?vehicle_id=${vehicleId}&page=${page}`).then((response: Response) => response.json(),
        (error: any) => error);
}

function getRefueling(id: number): Promise<IRefueling> {
    return authFetch(`/api/refuelings/${id}`).then((response: Response) => response.json(), (error: any) => error);
}