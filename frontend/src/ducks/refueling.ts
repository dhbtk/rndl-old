import { IRefueling, IState, Page } from '../models';
import initialState from './initialState';
import IAction from '../action';
import { authFetch } from '@edanniehues/devise-token-auth-redux';
import { ThunkAction } from 'redux-thunk';
import { startLoading, stopLoading } from './loading';

const LOAD_REFUELINGS_SUCCESS: string = 'LOAD_REFUELINGS_SUCCESS';
const LOAD_REFUELING_SUCCESS: string = 'LOAD_REFUELING_SUCCESS';

export function refuelings( state: Page<IRefueling> = initialState.refuelings, action: IAction<Page<IRefueling>> ): Page<IRefueling>
{
    switch ( action.type )
    {
        case LOAD_REFUELINGS_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}

export function refueling( state: IRefueling = initialState.refueling, action: IAction<IRefueling> ): IRefueling
{
    switch ( action.type )
    {
        case LOAD_REFUELING_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}

export function loadRefuelingsSuccess( vehicles: Page<IRefueling> ): IAction<Page<IRefueling>>
{
    return { type: LOAD_REFUELINGS_SUCCESS, payload: vehicles };
}

export function loadRefuelings( vehicleId: number, page: number = 1 ): ThunkAction<Promise<void>, IState, void>
{
    return dispatch =>
    {
        dispatch( startLoading() );
        return getAllRefuelings( vehicleId, page ).then( vehicles =>
        {
            dispatch( stopLoading() );
            dispatch( loadRefuelingsSuccess( vehicles ) );
        }, error =>
        {
            dispatch( stopLoading() );
            throw(error);
        } );
    };
}

function loadRefuelingSuccess( refueling: IRefueling ): IAction<IRefueling>
{
    return { type: LOAD_REFUELING_SUCCESS, payload: refueling };
}

export function loadRefueling( id: number ): ThunkAction<Promise<void>, IState, void>
{
    return dispatch =>
    {
        dispatch( startLoading() );
        return getRefueling( id ).then( refueling =>
        {
            dispatch( stopLoading() );
            dispatch( loadRefuelingSuccess( refueling ) );
        }, error =>
        {
            dispatch( stopLoading() );
            throw(error);
        } );
    };
}

function getAllRefuelings( vehicleId: number, page: number ): Promise<Page<IRefueling>>
{
    return authFetch( `/api/refuelings?vehicle_id=${vehicleId}&page=${page}` ).then( ( response: Response ) => response.json(),
        ( error: any ) => error );
}

function getRefueling( id: number ): Promise<IRefueling>
{
    return authFetch( `/api/refuelings/${id}` ).then( ( response: Response ) => response.json(), ( error: any ) => error );
}