import fetch from 'isomorphic-fetch'

export function getAndSetAccountInfo(dispatchAction, type){
    const account_uri = `api/v1/${type}s/${localStorage.account_id}`;
    fetch(account_uri, {
        method: 'GET',
        headers: { 'AUTHORIZATION': `${localStorage.token}`, 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(responseJSON => {
        dispatchAction(setAccount(type, responseJSON))
    })           
}

export function signupAccount(credentials){
    const { name, email, password, accountType, title } = credentials;
    return function(dispatch){
        const dispatcher = dispatch
        const paramters =  { [accountType]: { name: name, email: email, password: password, title } } 
        const uri = `api/v1/${accountType}_signup`
        return fetch(uri, { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(paramters) 
        })
        .then(response => response.json())
        .then(responseJSON => {
            localStorage.setItem('token', responseJSON.token);
            localStorage.setItem('account_id', responseJSON.account_id);
            dispatcher({ type: "LOGIN_SUCCESS" });
            getAndSetAccountInfo(dispatcher, accountType);
        }).catch(error => { throw(error) })
    }
}

function setAccount(type, response) {
    return { type: "SET_ACCOUNT", payload: { 
            accountType: type, 
            info: response 
        }
    } 
}