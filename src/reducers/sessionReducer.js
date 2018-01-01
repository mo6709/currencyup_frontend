export default function sessionReducer(state = {
     loggedIn: !!localStorage.getItem('token'),
     error: '',
     loading: false
    }, action){
    switch (action.type) {
        case 'LOADING':
            return Object.assign({}, state, { loading: true }) ;
        case 'LOGIN_FAILUR':
            return { loggedIn: false, error: action.message, loading: false }
        case 'LOGIN_SUCCESS': 
            return { loggedIn: !!localStorage.getItem('token'), error: "", loading: false }   
        case 'LOGOUT_SUCCESS':
            return ;  
        default:
            return state;
    }
}