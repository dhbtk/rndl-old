import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import initialState from 'reducers/initialState';

export default function configureStore() {
    return createStore(rootReducer, initialState, applyMiddleware(thunk));
}

export const store = configureStore();
