
export default function sessionReducer(state = {
     session: !!localStorage.getItem('access-token')
    }, action){
    switch (action.type) {
        case 'SIGNUP_ACCOUNT':
            return ;
        case 'LOGIN_SUCCESS':
            return { session: !!localStorage.getItem('access-token') }   
        case 'LOGOUT_ACCOUNT':
            return ;  
        default:
            return state;
    }
}

// seassion: { authenticated: false }