export default function accountReducer(state = {
    loading: false, account: {}
}, action){
    switch (action.type) {
        case 'ACCOUNT_SIGNUP':
            return Object.assign({}, state, { account: action.payload });
        case 'ACCOUNT_SIGNIN':
            return Object.assign({}, state, {});
        case 'ACCOUNT_LOGOUT':
            return Object.assign({}, state, {});       
        case 'ACCOUNT_UPDATE':
            return Object.assign({}, state, {});        
        default:
          return state;
  }
}