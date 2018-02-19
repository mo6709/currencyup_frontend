export default function accountTransactionReducer(state = {
	loading: false, status:'', response: null
}, action){
	switch(action.type){
		case 'TRANSACTION_PRESISTING':
		    return Object.assign({}, state, { loading: true })
		case 'TRANSACTION_PRESISTED_FAILUR':
		    return Object.assign({}, state, { 
		  	    loading: false, 
		  	    status: 'error', 
		  	    response: action.payload 
		  	})
		case 'TRANSACTION_PRESISTED_SUCCESS':
		    return Object.assign({}, state, {   
		    	loading: false, 
		  		status: 'success', 
		  		response: "success" 
		    })
		default:
		  return state;
	}
}