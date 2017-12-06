export default function investmentsReducer(state = {
    loading: false, all: []
}, action){
    switch (action.type) {
        case 'LOADING_INVESTMENTS':  
            return Object({}, state, { loading: true });
        case 'FETCH_INVESTMENTS':    
            return Object({}, state, { loading: false, all: action.payload });
        default:
            return state;
    }
}