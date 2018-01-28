export default function sessionReducer(state = {
     loggedIn: !!localStorage.getItem('token'),
     errors: '',
     loading: false
    }, action){
    switch (action.type) {
        case 'LOGIN_LOADING':
            return Object.assign({}, state, { loading: true }) ;
        case 'LOGIN_FAILUR':
            return Object.assign({}, state, { loggedIn: false, errors: action.payload, loading: false })
        case 'LOGIN_SUCCESS': 
            return Object.assign({}, state, { loggedIn: !!localStorage.getItem('token'), errors: "", loading: false })  
        case 'LOGOUT_SUCCESS':
            return Object.assign({}, state, { loggedIn: !!localStorage.getItem('token') }) 
        default:
            return state;
    }
}