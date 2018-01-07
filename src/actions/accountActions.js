import fetch from 'isomorphic-fetch'

export function getAndSetAccountInfo(dispatchAction, type, routerHistory){
    const account_uri = `http://localhost:3000/api/v1/${type}s/${localStorage.account_id}`;
    fetch(account_uri, {
        method: 'GET',
        headers: { 'AUTHORIZATION': `${localStorage.token}`, 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(responseJSON => {
        dispatchAction(setAccount(type, responseJSON));
        routerHistory.replace('/account');
    })           
}

export function signupAccount(accountCredentials, routerHistory){
    const { name, email, password, accountType, title } = accountCredentials;
    return function(dispatch){
        const dispatcher = dispatch;
        const paramters =  { [accountType]: { name: name, email: email, password: password, title } };
        const uri = `http://localhost:3000/api/v1/${accountType}_signup`;
        return fetch(uri, { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(paramters) 
        })
        .then(response => response.json())
        .then(responseJSON => {
            if( responseJSON.status === "error"){
                dispatcher({ type: "ACCOUNT_SIGNUP_FAILUR", messages: responseJSON.message || 'Somthing went wrong.' })
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
    const { type, id } = accountInfo;
    return function(dispatch){
        const uri = `http://localhost:3000/api/v1/${type}s/${id}`;
        var paramters = { [type]: accountInfo }
        return fetch(uri, {
            method: 'PUT',
            headers: { 'AUTHORIZATION': `${localStorage.token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify(paramters)
        })
        .then(response => response.json())
        .then(responseJSON => {
            if(responseJSON.status === "error"){
                let errors = "" 
                for(let key in responseJSON["messages"]){ errors += `${key}: ${responseJSON["messages"][key]}\n`}
                dispatch({ type: "ACCOUNT_UPDATE_FAILUR", messages: errors })
            }else{
                dispatch(setAccount(type, responseJSON));
                routerHistory.replace('/account')
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