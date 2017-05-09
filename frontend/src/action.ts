import {Action} from "redux";






interface IAction<P> extends Action {
    type: string,
    payload: P
}

export default IAction;
