import {createStore, applyMiddleware} from 'redux';
import rootReducer from './ducks';
import thunk from 'redux-thunk';
import initialState from './ducks/initialState';
import {IState} from "./models";
import {Store} from "redux";

export default function configureStore(): Store<IState> {
    return createStore(rootReducer, initialState, applyMiddleware(thunk));
}

export const store = configureStore();
