
export default function sessionReducer(state = {
     session: !!localStorage.getItem('access-token')
    }, action){
    switch (action.type) {
        case 'SIGNUP_ACCOUNT':
            return ;
        case 'LOGIN_SUCCESS':
            //push up the browser history (url) to /
            return { session: !!localStorage.getItem('token') }   
        case 'LOGOUT_ACCOUNT':
            return ;  
        default:
            return state;
    }
}

// seassion: { authenticated: false }