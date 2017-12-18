export default function accountReducer(state = {
    accountType: '' , info: {}
}, action){
    switch (action.type) {     
        case "SET_ACCOUNT":
            return Object.assign({}, state, { 
                accountType: action.payload.accountType, 
                info: action.payload.info 
            })
        default:
          return state;
  }
}