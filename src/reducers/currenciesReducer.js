export default function currenciesReducer(state = {
    loading: false, all: []
}, action){
    switch (action.type) {
        case 'LOADING_CURRENCIES':  
            return Object({}, state, { loading: true });
        case 'FETCH_CURRENCIES':    
            return Object({}, state, { loading: false, all: action.payload });
        default:
            return state;
    }
}