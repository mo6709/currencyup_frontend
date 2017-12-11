import fetch from 'isomorphic-fetch';


export function SignupUser(){
    
}
    
export function LoginUser(credentials){
    fetch('api/v1/corporation_auth/sign_in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)   
    })
    .then(response => response.json())
    .then(responseJSON => {
        console.log(responseJSON)
    })
    .catch(error => {
        console.log(error)
    })
}

export function LogoutUser(){
    
}