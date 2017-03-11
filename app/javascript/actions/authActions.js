import * as types from './types';
import {authFetch} from '../auth';
import 'whatwg-fetch'

export function login(email, password) {
    return function(dispatch) {
        dispatch(resetUser());
        window.fetch('/auth/sign_in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        }).then(result => {
            if (result.ok) {
                const [uid, token, client] = [result.headers.get('uid'), result.headers.get('access-token'), result.headers.get('client')];
                localStorage.setItem("uid", uid);
                localStorage.setItem("token", token);
                localStorage.setItem("client", client);
                const tokenData = { uid, token, client, validated: true };
                dispatch(tokenRefreshSuccess(tokenData));
                result.json().then(response => {
                    dispatch(loadUserSuccess(response.data));
                }).catch(error => dispatch(loadUserFailed()));
            } else {
                dispatch(loadUserFailed());
            }
        }).catch(error => dispatch(loadUserFailed()));
    }
}

export function logout() {
    return function(dispatch) {
        authFetch('/auth/sign_out', { method: 'DELETE' }).then(result => {
            if (result.ok) {
                localStorage.removeItem("uid");
                localStorage.removeItem("token");
                localStorage.removeItem("client");
                dispatch({ type: types.TOKEN_DELETE_SUCCESS });
            }
        })
    };
}

export function tokenRefreshSuccess(token) {
    console.log('setando token');
    return { type: types.TOKEN_REFRESH_SUCCESS, token };
}

export function resetUser() {
    return { type: types.RESET_USER };
}

export function loadUserSuccess(user) {
    return { type: types.LOAD_USER_SUCCESS, user };
}

export function loadUserFailed() {
    return { type: types.LOAD_USER_FAILED };
}
