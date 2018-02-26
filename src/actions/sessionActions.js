import fetch from 'isomorphic-fetch';
import { getAndSetAccountInfo } from './accountActions';
import api from '../api/api';
import { LOGIN_LOADING, LOGIN_FAILUR, LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../types';


// export function loginAccount(credentials, routerHistory){
//     const { accountType } = credentials;
//     return function(dispatch){
//         const dispatcher = dispatch;
//         dispatcher({ type: "LOGIN_LOADING" });
//         const uri = baseURL + `${accountType}_login`;
//         return fetch(uri, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(credentials)   
//         })
//         .then(response => response.json())
//         .then(responseJSON => {
//             const { status } = responseJSON;
//             if (status === "error" || status === 500){
//                  dispatcher({ type: "LOGIN_FAILUR", payload: responseJSON.messages || { error: 'Somthing went wrong.' } })
//             }else{ 
//                 localStorage.setItem('token', responseJSON.token);
//                 localStorage.setItem('account_id', responseJSON.account_id);
//                 dispatcher({ type: "LOGIN_SUCCESS" });
//                 getAndSetAccountInfo(dispatcher, accountType, routerHistory);
//             }
//         })
//         .catch(error => { throw(error) })
//     }
// }

export function logoutAccount(routerHistory){
    return function(dispatch){
        ['token', 'account_id', 'state'].forEach(item => {
            localStorage.removeItem(item)
        });

        ['LOGOUT_SUCCESS', 'ACCOUNT_LOGOUT_SETUP'].forEach(type => {
            dispatch({ type: type })
        })
        routerHistory.replace("/");
    }
}

export const loginLoading = () => ({ type: LOGIN_LOADING });

export const loginFailur = account => ({ type: LOGIN_FAILUR, payload: account.messages || { error: 'Somthing went wrong.' } });

export const loginSuccess = () => ({ type: LOGIN_SUCCESS });

export const setLocalStorage = account => {
    localStorage.removeItem('token');
    localStorage.removeItem('account_id');
    localStorage.setItem('token', account.token);
    localStorage.setItem('account_id', account.account_id);
};

//actions
export const login = (credentials, routerHistory) => dispatch => {
    loginLoading();
    api.account.login(credentials).then( response => {
        const { status } = response;
        if (status === "error" || status === 500){
            dispatch(loginFailur(response))
        }else{ 
            setLocalStorage(response);
            dispatch(loginSuccess());
            debugger;
            // getAndSetAccountInfo(dispatcher, accountType, routerHistory);
        }
    });
}


