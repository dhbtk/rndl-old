import {store} from 'store';
import {tokenRefreshSuccess, tokenDeleteSuccess, resetUser} from 'actions/authActions.js';
import {pushError} from 'actions/flashActions.js';
import 'whatwg-fetch'

export const authSettings = { settings: {
    apiUrl: '',
    loginRoute: '/login',
    signInPath: '/auth/sign_in',
    validateTokenPath: '/auth/validate_token',
    signOutPath: '/auth/sign_out',
    pushNotice(notice) {},
    pushError(error) {}
} };

export function setAuthSettings(settings) {
    authSettings.settings = Object.assign(authSettings.settings, settings);
}

export function requireAuth(nextState, replace) {
    const { token } = store.getState();
    if (!token.validated) {
        replace({
            pathname: authSettings.settings.loginRoute,
            state: { nextPathname: nextState.location.pathname }
        });
    }
}

export function addAuthorizationHeader(headers = {}, token) {
    return Object.assign(headers, { 'access-token': token.token, uid: token.uid, client: token.client });
}

export function updateTokenFromHeaders(headers) {
    const [uid, token, client] = [headers.get('uid'), headers.get('access-token'), headers.get('client')];
    const tokenData = { uid, token, client, validated: true };
    if (tokenData.token === null) {
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
                if (result.ok) {
                    updateTokenFromHeaders(result.headers);
                    resolve(result);
                } else if (result.status == 500) {
                    reject(result);
                    store.dispatch(pushError("Ocorreu um erro interno no servidor. Por favor, entre em contato."));
                    result.json().then(json => console.error("HTTP 500: ", json));
                } else if(result.status == 401) {
                    reject(result);
                    store.dispatch(tokenDeleteSuccess());
                    store.dispatch(resetUser());
                    store.dispatch(pushError("Por favor, faça login novamente."));
                }
            }).catch(error => {
                console.error(error);
                reject(error);
            });
        } else {
            reject("not logged in");
        }
    });
}
