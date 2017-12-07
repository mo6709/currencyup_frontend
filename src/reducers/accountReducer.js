export default function accountReducer(state = {
    loading: false, account: {}
}, action){
    switch (action.type) {     
        case 'ACCOUNT_UPDATE':
            return Object.assign({}, state, {});        
        default:
          return state;
  }
}