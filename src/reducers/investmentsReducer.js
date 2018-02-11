export default function investmentsReducer(state = {
    loading: false, all: []
}, action){
    switch (action.type) {
        case 'LOADING_INVESTMENTS':
            return Object.assign({}, state, { loading: true });
        case 'FETCH_INVESTMENTS':
            return Object.assign({}, state, { loading: false, all: action.payload });
        default:
            return state;
    }
}