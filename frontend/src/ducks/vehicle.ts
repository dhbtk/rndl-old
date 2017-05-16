import IAction from '../action';
import initialState from './initialState';
import { IState, IVehicle } from '../models';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { startLoading, stopLoading } from './loading';
import { authFetch } from '@edanniehues/devise-token-auth-redux';
import { pushError, pushNotice } from './flash';
import { actions as formActions } from 'react-redux-form';

const LOAD_VEHICLES_SUCCESS: string = 'LOAD_VEHICLES_SUCCESS';
const LOAD_VEHICLE_SUCCESS: string = 'LOAD_VEHICLE_SUCCESS';

export function vehicles(state: IVehicle[] = initialState.vehicles, action: IAction<IVehicle[]>): IVehicle[] {
    switch (action.type) {
        case LOAD_VEHICLES_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}

export function vehicle(state: IVehicle = initialState.vehicle, action: IAction<IVehicle>): IVehicle {
    switch (action.type) {
        case LOAD_VEHICLE_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}

export function loadVehicles(): ThunkAction<Promise<void>, IState, void> {
    return (dispatch: Dispatch<IState>) => {
        dispatch(startLoading());
        return getAllVehicles().then((vehicles: IVehicle[]) => {
            dispatch(stopLoading());
            dispatch(loadVehiclesSuccess(vehicles));
        }).catch((error: any) => {
            dispatch(stopLoading());
            throw(error);
        });
    };
}

export function loadVehiclesSuccess(vehicles: IVehicle[]): IAction<IVehicle[]> {
    return { type: LOAD_VEHICLES_SUCCESS, payload: vehicles };
}

export function loadVehicle(id: number): ThunkAction<Promise<void>, IState, void> {
    return (dispatch: Dispatch<IState>) => {
        dispatch(startLoading());
        return getVehicle(id).then((vehicle: IVehicle) => {
            dispatch(stopLoading());
            dispatch(formActions.load('form.vehicle', {
                id: vehicle.id,
                name: vehicle.name,
                torque_id: vehicle.torque_id
            }));
            dispatch(loadVehicleSuccess(vehicle));
        }).catch((error: any) => {
            dispatch(stopLoading());
            throw(error);
        });
    };
}

export function loadVehicleSuccess(vehicle: IVehicle): IAction<IVehicle> {
    return { type: LOAD_VEHICLE_SUCCESS, payload: vehicle };
}

export function createVehicle(vehicle: IVehicle): ThunkAction<Promise<void>, Dispatch<IState>, void> {
    return (dispatch: Dispatch<IState>) => {
        dispatch(startLoading());
        return authFetch(`/api/vehicles`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ vehicle: vehicle })
        }).then((response: Response) => {
            dispatch(stopLoading());
            if (response.ok) {
                dispatch(pushNotice('Veículo adicionado.'));
                dispatch(loadVehicles());
            } else if (response.status === 422) {
                dispatch(pushError('Por favor, verifique os erros e tente novamente.'));
                response.json().then(json => console.log(json));
            } else {
                dispatch(pushError('Não foi possível salvar por conta de um erro de servidor.'));
            }
        }, (error: any) => {
            dispatch(stopLoading());
            return error;
        });
    };
}

export function destroyVehicle(vehicle: IVehicle): ThunkAction<Promise<void>, Dispatch<IState>, void> {
    return (dispatch: Dispatch<IState>) => {
        dispatch(startLoading());
        return authFetch(`/api/vehicles/${vehicle.id}`, { method: 'DELETE' }).then((response: Response) => {
            dispatch(stopLoading());
            if (response.ok) {
                dispatch(pushNotice('Veículo excluído.'));
                dispatch(loadVehicles());
            } else {
                dispatch(pushError('Não foi possível excluir o veículo.'));
            }
        }, (error: any) => dispatch(stopLoading()));
    }
}

function getAllVehicles(): Promise<IVehicle[]> {
    return authFetch(`/api/vehicles`).then((response: Response) => {
        return response.json();
    }).catch((error: any) => {
        return error;
    });
}

function getVehicle(id: number) {
    return authFetch(`/api/vehicles/${id}`).then((response: Response) => {
        return response.json();
    }).catch((error: any) => {
        return error;
    });
}