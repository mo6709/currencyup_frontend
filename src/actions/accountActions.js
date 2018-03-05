import fetch from 'isomorphic-fetch';
import { baseURL } from '../api/api';
import api from '../api/api';
import { setLocalStorage } from './storageSetup';
import { ACCOUNT_SIGNUP_LOADING, ACCOUNT_SIGNUP_FAILUR, ACCOUNT_SIGNUP_SUCCESS, LOGIN_SUCCESS } from '../types';

export const paramsFormating = params => { 
    const { name, 
            email, 
            password, 
            accountType, 
            title, 
            firstName, 
            lastName, 
            region, 
            investment_period, 
            currency } = params;

    let accountInfo = null;
    if(accountType === "corporation"){
        accountInfo = { name, title , email, password, investment_period, currency, accountType }
    }else if(accountType === "investor"){
        accountInfo = { first_name: firstName, last_name: lastName, email, password, region, currency, accountType }
    }
    return { [accountType]: accountInfo };
}

export const setAccount = (type, response) => 
    ({ type: "ACCOUNT_SETUP", payload: { 
            accountType: type, 
            info: response 
        }
    })

export const signupLoading = () => 
    ({ type: ACCOUNT_SIGNUP_LOADING })

export const signupFailur = response => 
    ({ type: ACCOUNT_SIGNUP_FAILUR, payload: response.messages || { error: 'Somthing went wrong.'} })

export const loginSuccess = () =>
    ({ type: LOGIN_SUCCESS })


//Actions
export const getAndSetAccountInfo = (dispatchAction, type, routerHistory = null) => {
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
    .catch(error => { throw(error) })           
}

export const signupAccount = (accountCredentials, routerHistory) => dispatch => {
    dispatch(signupLoading());
    const params = paramsFormating(accountCredentials);
    api.account.signup(params).then(response => {
        const { status } = response;
        if(status === "error" || status === 500){
            dispatch(signupFailur(response))
        }else{
            setLocalStorage(response);
            dispatch(loginSuccess());
            getAndSetAccountInfo(dispatch, accountCredentials.accountType, routerHistory);
        }
    }).catch(error => { throw(error) })
}


export function updateAndSetAccountInfo(accountInfo, routerHistory){
    const { type, id, email, name, title, firstName, lastName, region, regions_array , investment_period } = accountInfo;
    return function(dispatch){
        const uri = baseURL + `${type}s/${id}`;
        
        let paramters = null;
        if(type === "corporation"){
            paramters = { id, email, name, title, regions_array, investment_period }
        }else if(type === "investor"){
            paramters = { id, email, first_name: firstName, last_name: lastName, region }
        }
        var accountParamters = { [type]: paramters };

        return fetch(baseURL + `${type}s/${id}`, {
            method: 'PUT',
            headers: { 'AUTHORIZATION': `${localStorage.token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify(accountParamters)
        })
        .then(response => response.json())

        api.account.update(accountInfo)
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

