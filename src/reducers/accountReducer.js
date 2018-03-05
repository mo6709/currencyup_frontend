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
        case "ACCOUNT_SIGNUP_LOADING":
            return state;
        case "ACCOUNT_SIGNUP_FAILUR":
            return Object.assign({}, state, { errors: action.payload });
        case "ACCOUNT_UPDATE_FAILUR":
            return Object.assign({}, state, { errors: action.payload });
        case 'GENERATING_CORPORSTION_INVESTMENT':
            return state;
        case "GENERATE_CORPORSTION_INVESTMENT_FAILUR":
            return Object.assign({}, state, { errors: action.payload });
        case "GENERATE_CORPORSTION_INVESTMENT_SUCCESS":
            var newInfo = Object.assign({}, state.info);
            newInfo.corporation_investments = action.payload;          
            return Object.assign({}, state, { errors: '', info: newInfo });
        case 'DELETING_CORPORSTION_INVESTMENT':
            return state;
        case 'DELETE_CORPORSTION_INVESTMENT_FAILUR':
            return Object.assign({}, state, { errors: action.payload });
        case 'DELETE_CORPORSTION_INVESTMENT_SUCCESS':
            const newInfo = Object.assign({}, state.info); 
            newInfo.corporation_investments = action.payload;
            return Object.assign({}, state, { errors: '', info: newInfo });
        case "ACCOUNT_LOGOUT_SETUP":
            return Object.assign({}, { accountType: '', info: {}, errors: '' });
        default:
          return state;
  }
}