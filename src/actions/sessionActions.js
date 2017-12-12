import fetch from 'isomorphic-fetch';


export function signupAccount(){
    
}
    
export function loginAccount(credentials){
    return function(dispatch){
        return fetch('api/v1/corporation_auth/sign_in', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)   
        })
        .then((response) => {
            localStorage.setItem('access-token', response.headers.get("access-token"));
            return response.json();
        })
        .then(responseJSON => {
            dispatch(loginSuccess(responseJSON));
        })
        .catch(error => {
            throw(error);
        })
    }
}

export function loginSuccess(accountJSON){
    return { type: "LOGIN_SUCCESS", payload: accountJSON }
}

export function logoutAccount(){
    
}