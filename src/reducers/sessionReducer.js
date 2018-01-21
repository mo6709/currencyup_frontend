export default function sessionReducer(state = {
     loggedIn: false,
     errors: '',
     loading: false
    }, action){
    switch (action.type) {
        case 'LOGIN_LOADING':
            return Object.assign({}, state, { loading: true }) ;
        case 'LOGIN_FAILUR':
            return { loggedIn: false, errors: action.messages, loading: false }
        case 'LOGIN_SUCCESS': 
            return { loggedIn: !!localStorage.getItem('token'), errors: "", loading: false }   
        case 'LOGOUT_SUCCESS':
            return { loggedIn: !!localStorage.getItem('token') } 
        default:
            return state;
    }
}