import fetch from 'isomorphic-fetch';
import api from '../api/api';
import { getAndSetAccountInfo } from './accountActions';
import { LOGIN_LOADING, LOGIN_FAILUR, LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../types';

export const loginLoading = () => ({ type: LOGIN_LOADING })

export const loginFailur = account => ({ type: LOGIN_FAILUR, payload: account.messages || { error: 'Somthing went wrong.' } })

export const loginSuccess = () => ({ type: LOGIN_SUCCESS })

export const cleanLocalStorage = state => { 
    ['token', 'account_id', state].forEach(item => {
        localStorage.removeItem(item)
    })
}

export const setLocalStorage = (account, state = null) => {
    cleanLocalStorage(state);
    localStorage.setItem('token', account.token);
    localStorage.setItem('account_id', account.account_id);
}

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
            getAndSetAccountInfo(dispatch, credentials.accountType, routerHistory);
        }
    });
}

export const logout = routerHistory => dispatch => {
    cleanLocalStorage('state');
    ['LOGOUT_SUCCESS', 'ACCOUNT_LOGOUT_SETUP'].forEach(type => {
        dispatch({ type })
    });
    routerHistory.replace("/");
}

