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
            if (responseJSON.status === "error"){
                 dispatcher({ type: "LOGIN_FAILUR", messages: responseJSON.messages || 'Somthing went wrong.' })
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

export function logoutAccount(){
    
}