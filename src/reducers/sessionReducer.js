export default function sessionReducer(state = {}, action){
    switch (action.type) {
        case 'SIGNUP_USER':
            return ;
        case 'SIGNIN_USER':
            return ;
        case 'LOGOUT_USER':
            return ;  
        default:
            return state;
    }
}

// seassion: { authenticated: false }