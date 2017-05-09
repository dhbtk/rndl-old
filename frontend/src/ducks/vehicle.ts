import IAction from '../action';
import initialState from './initialState';
import { IState, IVehicle } from '../models';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { startLoading, stopLoading } from './loading';
import { authFetch } from '@edanniehues/devise-token-auth-redux';

const LOAD_VEHICLES_SUCCESS: string = 'LOAD_VEHICLES_SUCCESS';
const LOAD_VEHICLE_SUCCESS: string = 'LOAD_VEHICLE_SUCCESS';

export function vehicles( state: IVehicle[] = initialState.vehicles, action: IAction<IVehicle[]> ): IVehicle[]
{
    switch ( action.type )
    {
        case LOAD_VEHICLES_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}

export function vehicle( state: IVehicle = initialState.vehicle, action: IAction<IVehicle> ): IVehicle
{
    switch ( action.type )
    {
        case LOAD_VEHICLE_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}

export function loadVehicles(): ThunkAction<Promise<void>, IState, void>
{
    return ( dispatch: Dispatch<IState> ) =>
    {
        dispatch( startLoading() );
        return getAllVehicles().then( ( vehicles: IVehicle[] ) =>
        {
            dispatch( stopLoading() );
            dispatch( loadVehiclesSuccess( vehicles ) );
        } ).catch( ( error: any ) =>
        {
            dispatch( stopLoading() );
            throw(error);
        } );
    };
}

export function loadVehiclesSuccess( vehicles: IVehicle[] ): IAction<IVehicle[]>
{
    return { type: LOAD_VEHICLES_SUCCESS, payload: vehicles };
}

export function loadVehicle( id: number ): ThunkAction<Promise<void>, IState, void>
{
    return ( dispatch: Dispatch<IState> ) =>
    {
        dispatch( startLoading() );
        return getVehicle( id ).then( ( vehicle: IVehicle ) =>
        {
            dispatch( stopLoading() );
            dispatch( loadVehicleSuccess( vehicle ) );
        } ).catch( ( error: any ) =>
        {
            dispatch( stopLoading() );
            throw(error);
        } );
    };
}

export function loadVehicleSuccess( vehicle: IVehicle ): IAction<IVehicle>
{
    return { type: LOAD_VEHICLE_SUCCESS, payload: vehicle };
}

function getAllVehicles(): Promise<IVehicle[]>
{
    return authFetch( `/api/vehicles` ).then( ( response: Response ) =>
    {
        return response.json();
    } ).catch( ( error: any ) =>
    {
        return error;
    } );
}

function getVehicle( id: number )
{
    return authFetch( `/api/vehicles/${id}` ).then( ( response: Response ) =>
    {
        return response.json();
    } ).catch( ( error: any ) =>
    {
        return error;
    } );
}