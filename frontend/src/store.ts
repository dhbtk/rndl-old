import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import * as createLogger from 'redux-logger';
import initialState from './reducers/initialState';
import {IState} from "./models";
import {Store} from "redux";

export default function configureStore(): Store<IState> {
    return createStore(rootReducer, initialState, applyMiddleware(thunk, createLogger()));
}

export const store = configureStore();
