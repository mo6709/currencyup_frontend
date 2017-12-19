import fetch from 'isomorphic-fetch';
// import { getAccountInfo } from './accountActions'

export function signupAccount(){
    
}
    
export function loginAccount(credentials){
    return function(dispatch){
        const uri = `api/v1/${credentials["accountType"]}_login`
        return fetch(uri, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)   
        })
        .then(response => response.json())
        .then(responseJSON => {    
            localStorage.setItem('token', responseJSON.token);
            localStorage.setItem('account_id', responseJSON.account_id);
            
            const account_uri = `api/v1/${credentials["accountType"]}s/${localStorage.account_id}`
            fetch(account_uri, {
                method: 'GET',
                headers: { 'AUTHORIZATION': `${localStorage.token}`, 'Content-Type': 'application/json'}
                }
            )
            .then(response => response.json())
            .then(responseJSON => {
                dispatch(
                    {   
                        type: "SET_ACCOUNT", 
                        payload: { 
                            accountType: credentials["accountType"], 
                            info: responseJSON 
                        } 
                    }
                )
                dispatch(loginSuccess(responseJSON));
            })
            .catch(error => {
                throw(error)
            })
            
        })
        .catch(error => {
            throw(error);
        })
    }
}

export function loginSuccess(token){
    return { type: "LOGIN_SUCCESS", payload: token }
}

export function logoutAccount(){
    
}