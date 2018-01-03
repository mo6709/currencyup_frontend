export default function accountReducer(state = {
    accountType: '', 
    info: {},
    errors: ''
}, action){
    switch (action.type) {     
        case "ACCOUNT_SETUP":
            return Object.assign({}, state, { 
                accountType: action.payload.accountType, 
                info: action.payload.info,
                errors: ''
            });
        case "ACCOUNT_SIGNUP_FAILUR":
            return Object.assign({}, state, { errors: action.message });
        case "ACCOUNT_UPDATE_FAILUR":
            return Object.assign({}, state, { errors: action.message });
        default:
          return state;
  }
}