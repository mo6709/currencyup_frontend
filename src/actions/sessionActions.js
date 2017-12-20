import fetch from 'isomorphic-fetch';
import { getAndSetAccountInfo } from './accountActions'
    
export function loginAccount(credentials){
    const { accountType } = credentials;
    return function(dispatch){
        const dispatcher = dispatch
        const uri = `api/v1/${accountType}_login`
        return fetch(uri, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)   
        })
        .then(response => response.json())
        .then(responseJSON => {    
            localStorage.setItem('token', responseJSON.token);
            localStorage.setItem('account_id', responseJSON.account_id);
            dispatcher({ type: "LOGIN_SUCCESS" })
            getAndSetAccountInfo(dispatcher, accountType)
        })
        .catch(error => { throw(error) })
    }
}

export function logoutAccount(){
    
}