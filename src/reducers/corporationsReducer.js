export default function corporationsReducer(state = {
	loading: false, all: []
}, action){
	switch(action.type){
		case 'LOADING_CORPORATIONS':
		  return Object.assign({}, state, { loading: true })
		case 'FETCH_CORPORATIONS':
		  return Object.assign({}, state, { loading: false, all: action.payload });
		default:
		  return state;
	}
}