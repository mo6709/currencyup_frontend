import fetch from 'isomorphic-fetch'

export function getAccountInfo(accountType){
    return function(dispatch)
        debugger;
        const account_uri = `api/v1/${accountType}s/${localStorage.account_id}`
        fetch(account_uri, {
            method: 'GET',
            headers: { 'AUTHORIZATION': `${localStorage.token}`, 'Content-Type': 'application/json' }
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
        })
   }
}

function setAccount(accountInfo) {
    return {type: "SET_ACCOUNT", payload: accountInfo.data} 
}