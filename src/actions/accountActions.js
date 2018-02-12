import fetch from 'isomorphic-fetch';
import { baseURL } from '../api/api';


export function getAndSetAccountInfo(dispatchAction, type, routerHistory = null){
    const { account_id, token } = localStorage;
    const account_uri = baseURL + `${type}s/${account_id}`;
    fetch(account_uri, {
        method: 'GET',
        headers: { 'AUTHORIZATION': `${token}`, 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(responseJSON => {
        dispatchAction(setAccount(type, responseJSON));
        !!routerHistory ? routerHistory.replace(`/account/${type}s/${account_id}`) : null
    })
    .catch(error => { throw(error)} )           
}

export function signupAccount(accountCredentials, routerHistory){
    const { name, email, password, accountType, title, firstName, lastName, region, investment_period } = accountCredentials;
    return function(dispatch){
        const dispatcher = dispatch;

        let accountInfo = null;
        if(accountType === "corporation"){
            accountInfo = { name: name, title: title , email: email, password: password, investment_period: investment_period }
        }else if(accountType === "investor"){
            accountInfo = { first_name: firstName, last_name: lastName, email: email, password: password, region: region }
        }
        var paramters = { [accountType]: accountInfo };

        const uri = baseURL + `${accountType}_signup`;
        return fetch(uri, { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(paramters) 
        })
        .then(response => response.json())
        .then(responseJSON => {
            const { status } = responseJSON;
            if(status === "error" || status === 500){
                dispatcher({ type: "ACCOUNT_SIGNUP_FAILUR", payload: responseJSON.messages || { error: 'Somthing went wrong.'} })
            }else{
                localStorage.setItem('token', responseJSON.token);
                localStorage.setItem('account_id', responseJSON.account_id);
                dispatcher({ type: "LOGIN_SUCCESS" });
                getAndSetAccountInfo(dispatcher, accountType, routerHistory);
            }
        }).catch(error => { throw(error) })
    }
}

export function updateAndSetAccountInfo(accountInfo, routerHistory){
    const { type, id, email, name, title, firstName, lastName, region, regions_array , investment_period } = accountInfo;
    return function(dispatch){
        const uri = baseURL + `${type}s/${id}`;
        
        let paramters = null;
        if(type === "corporation"){
            paramters = { email, name, title, regions_array, investment_period }
        }else if(type === "investor"){
            paramters = { email: email, first_name: firstName, last_name: lastName, region: region }
        }
        var accountParamters = { [type]: paramters };

        return fetch(uri, {
            method: 'PUT',
            headers: { 'AUTHORIZATION': `${localStorage.token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify(accountParamters)
        })
        .then(response => response.json())
        .then(responseJSON => {
            const { status } = responseJSON;
            if(status === "error" || status === 500){
                dispatch({ type: "ACCOUNT_UPDATE_FAILUR", payload: responseJSON.messages || { error: 'Somthing went wrong.' } })
            }else{
                dispatch(setAccount(type, responseJSON));
                routerHistory.replace(`/account/${type}s/${id}`);
            }
        })
        .catch( error => { throw(error) })
    }
}

function setAccount(type, response) {
    return { type: "ACCOUNT_SETUP", payload: { 
            accountType: type, 
            info: response 
        }
    } 
}