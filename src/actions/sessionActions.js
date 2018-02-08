import fetch from 'isomorphic-fetch';
import { getAndSetAccountInfo } from './accountActions';

export function loginAccount(credentials, routerHistory){
    const { accountType } = credentials;
    return function(dispatch){
        const dispatcher = dispatch;
        dispatcher({ type: "LOGIN_LOADING" });
        const uri = `http://localhost:3000/api/v1/${accountType}_login`;
        return fetch(uri, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)   
        })
        .then(response => response.json())
        .then(responseJSON => {
            const { status } = responseJSON;
            if (status === "error" || status === 500){
                 dispatcher({ type: "LOGIN_FAILUR", payload: responseJSON.messages || { error: 'Somthing went wrong.' } })
            }else{ 
                localStorage.setItem('token', responseJSON.token);
                localStorage.setItem('account_id', responseJSON.account_id);
                dispatcher({ type: "LOGIN_SUCCESS" });
                getAndSetAccountInfo(dispatcher, accountType, routerHistory);
            }
        })
        .catch(error => { throw(error) })
    }
}

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