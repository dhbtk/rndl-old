import * as types from './types';
import {pushNotice, pushError} from './flashActions';
import {authFetch, updateTokenFromHeaders, addAuthorizationHeader} from '../auth';
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
                    dispatch(pushNotice("Login efetuado com sucesso."));
                }).catch(error => dispatch(loadUserFailed()));
            } else {
                dispatch(tokenDeleteSuccess());
                dispatch(loadUserFailed());
                dispatch(pushError("Email ou senha incorretos. Por favor, corrija e tente novamente."));
            }
        }).catch(error => {
            dispatch(tokenDeleteSuccess());
            dispatch(loadUserFailed());
        });
    }
}

export function validateToken(token) {
    return function(dispatch) {
        window.fetch('/auth/validate_token', { headers: addAuthorizationHeader({}, token) }).then(result => {
            updateTokenFromHeaders(result.headers);
            if (result.ok) {
                result.json().then(result => dispatch(loadUserSuccess(result.data)));
            } else {
                console.log(result);
                dispatch(tokenDeleteSuccess());
                dispatch(loadUserFailed());
                dispatch(pushError("Por favor, faça login novamente."));
            }
        }).catch(error => {
            console.log(error);
            dispatch(tokenDeleteSuccess());
            dispatch(loadUserFailed());
            dispatch(pushError("Por favor, faça login novamente."));
        });
    }
}

export function logout() {
    return function(dispatch) {
        authFetch('/auth/sign_out', { method: 'DELETE' });
        localStorage.removeItem("uid");
        localStorage.removeItem("token");
        localStorage.removeItem("client");
        dispatch(tokenDeleteSuccess());
        dispatch(resetUser());
        dispatch(pushNotice("Logout efetuado com sucesso."));
    }
}

export function tokenDeleteSuccess() {
    return { type: types.TOKEN_DELETE_SUCCESS };
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
