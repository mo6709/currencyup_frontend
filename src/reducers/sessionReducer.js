export default function sessionReducer(state = {}, action){
    switch (action.type) {
        case 'SIGNUP_ACCOUNT':
            return ;
        case 'LOGIN_SUCCESS':
            debugger;
            return;    
        case 'LOGOUT_ACCOUNT':
            return ;  
        default:
            return state;
    }
}

// seassion: { authenticated: false }