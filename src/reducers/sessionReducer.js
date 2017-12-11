export default function sessionReducer(state = {}, action){
    switch (action.type) {
        case 'ACCOUNT_SIGNUP':
            return ;
        case 'ACCOUNT_SIGNIN':
            return ;
        case 'ACCOUNT_LOGOUT':
            return ;  
        default:
            return state;
    }
}

// seassion: { authenticated: false }