
export default function sessionReducer(state = {
     loggedIn: !!localStorage.getItem('token')
    }, action){
    switch (action.type) {
        case 'SIGNUP_ACCOUNT':
            return ;
        case 'LOGIN_SUCCESS':
            //push up the browser history (url) to /
            return { loggedIn: !!localStorage.getItem('token') }   
        case 'LOGOUT_ACCOUNT':
            return ;  
        default:
            return state;
    }
}

// seassion: { authenticated: false }