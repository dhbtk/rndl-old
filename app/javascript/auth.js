import {store} from 'store';
import {tokenRefreshSuccess, loadUserSuccess, loadUserFailed} from 'actions/authActions.js';
import 'whatwg-fetch'

export function requireAuth(nextState, replace) {
    const { token } = store.getState();
    if (!token.validated) {
        replace({
            pathname: '/login',
            state: { nextPathname: nextState.location.pathname }
        });
    }
}

function addAuthorizationHeader(headers = {}, token) {
    return Object.assign(headers, { 'access-token': token.token, uid: token.uid, client: token.client });
}

function updateTokenFromHeaders(headers) {
    const [uid, token, client] = [headers.get('uid'), headers.get('access-token'), headers.get('client')];
    const tokenData = { uid, token, client, validated: true };
    if(tokenData.token === null) {
        console.log('Mesmo token');
    } else {
        localStorage.setItem("uid", uid);
        localStorage.setItem("token", token);
        localStorage.setItem("client", client);
        store.dispatch(tokenRefreshSuccess(tokenData));
    }
}

export function authFetch(url, origOpts = {}) {
    return new Promise((resolve, reject) => {
        const { token } = store.getState();
        if (token.validated) {
            const opts = Object.assign(origOpts, { headers: addAuthorizationHeader(origOpts.headers, token) });
            window.fetch(url, opts).then(result => {
                updateTokenFromHeaders(result.headers);
                resolve(result);
            }).catch(error => {
                console.error(error);
                reject(error);
            });
        } else if (token.token !== null) {
            window.fetch('/auth/validate_token', { headers: addAuthorizationHeader(opts.headers, token) }).then(result => {
                updateTokenFromHeaders(result.headers);
                if (result.ok) {
                    result.json().then(result => loadUserSuccess(result.data));
                    const opts = Object.assign(origOpts, { headers: addAuthorizationHeader(origOpts.headers, token) });
                    window.fetch(url, opts).then(result => {
                        updateTokenFromHeaders(result.headers);
                        resolve(result);
                    }).catch(error => reject(error));
                }
            });
        } else {
            reject("not logged in");
        }
    });
}

export function validateToken() {
    const { token } = store.getState();
    window.fetch('/auth/validate_token', { headers: addAuthorizationHeader({}, token) }).then(result => {
        updateTokenFromHeaders(result.headers);
        if (result.ok) {
            result.json().then(result => store.dispatch(loadUserSuccess(result.data)));
        } else {
            console.log(result);
            store.dispatch(loadUserFailed());
        }
    }).catch(error => {
        console.log(error);
        store.dispatch(loadUserFailed());
    });
}
