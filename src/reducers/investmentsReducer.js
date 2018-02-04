export default function investmentsReducer(state = {
    loading: false, all: []
}, action){
    switch (action.type) {
        case 'LOADING_INVESTMENTS':
            return Object.assign({}, state, { loading: true });
        case 'FETCH_INVESTMENTS':
            return { loading: false, all: action.payload };
        case 'GENERATING_INVESTMENT':
            return Object.assign({}, state, { loading: true });
        default:
            return state;
    }
}