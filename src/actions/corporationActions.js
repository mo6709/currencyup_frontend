import fetch from 'isomorphic-fetch';

export function fetchCorporations(){
    return function(dispatch){
    	dispatch({ type: 'LOADING_CORPORATIONS' });

    	return fetch('http://localhost:3000/api/v1/corporations')
    	.then( response => response.json())
    	.then(responseJSON => {
    		debugger;
    		dispatch({ type: 'FETCH_CORPORATIONS', payload: responseJSON.data })
    	})
    	.catch( error => { throw(error) })
    }
}