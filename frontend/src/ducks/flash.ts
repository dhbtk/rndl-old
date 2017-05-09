import IAction from '../action';
import initialState from './initialState';
import { IFlash } from '../models';

const PUSH_NOTICE: string = 'PUSH_NOTICE';
const POP_NOTICE: string = 'POP_NOTICE';
const PUSH_ERROR: string = 'PUSH_ERROR';
const POP_ERROR: string = 'POP_ERROR';

export default function reducer( state: IFlash = initialState.flash, action: IAction<string> ): IFlash
{
    switch ( action.type )
    {
        case PUSH_NOTICE:
            return { type: 'info', text: action.payload };
        case PUSH_ERROR:
            return { type: 'danger', text: action.payload };
        case POP_NOTICE:
        case POP_ERROR:
            return null;
        default:
            return state;
    }
}

export function pushNotice( notice: string ): IAction<string>
{
    return { type: PUSH_NOTICE, payload: notice };
}

export function popNotice(): IAction<null>
{
    return { type: POP_NOTICE, payload: null };
}

export function pushError( error: string ): IAction<string>
{
    return { type: PUSH_ERROR, payload: error };
}

export function popError(): IAction<null>
{
    return { type: POP_ERROR, payload: null };
}
