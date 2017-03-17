import * as types from "../actions/types";
import IAction from "../actions/types";
import initialState from "./initialState";
import {IFlash} from "../models";

export function flash(state: IFlash = initialState.flash, action: IAction<string>): IFlash {
    switch(action.type) {
        case types.PUSH_NOTICE:
            return { type: "info", text: action.payload };
        case types.PUSH_ERROR:
            return { type: "danger", text: action.payload };
        case types.POP_NOTICE:
        case types.POP_ERROR:
            return null;
        default:
            return state;
    }
}
