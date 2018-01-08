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
            return Object.assign({}, state, { errors: action.messages });
        case "ACCOUNT_UPDATE_FAILUR":
            return Object.assign({}, state, { errors: action.messages });
        case "FETCH_CORPORSTION_INVESTMENTS_SUCCESS":
            var newInfo = Object.assign({}, state.info);
            newInfo.corporation_investments = action.payload;
            return Object.assign({}, state,  { info: newInfo });
        case "FETCH_CORPORSTION_INVESTMENTS_FAILUR":
            return Object.assign({}, state, { errors: action.messages });
        default:
          return state;
  }
}