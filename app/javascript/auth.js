import {store} from 'store';
import {tokenRefreshSuccess, loadUserSuccess} from 'actions/authActions.js';
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
    localStorage.setItem("uid", uid);
    localStorage.setItem("token", token);
    localStorage.setItem("client", client);
    const tokenData = { uid, 'access-token': token, client, validated: true };
    store.dispatch(tokenRefreshSuccess(tokenData));
}

export function authFetch(url, origOpts = {}) {
    return new Promise((resolve, reject) => {
        const { token } = store.getState();
        if (token.validated) {
            console.log('token validado');
            const opts = Object.assign(origOpts, { headers: addAuthorizationHeader(origOpts.headers, token) });
            console.log(url, opts);
            window.fetch(url, opts).then(result => {
                console.log(result);
                updateTokenFromHeaders(result.headers);
                resolve(result);
            }).catch(error => reject(error));
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
            })
        } else {
            reject("not logged in");
        }
    });
}
