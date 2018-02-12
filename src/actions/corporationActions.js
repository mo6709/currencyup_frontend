import fetch from 'isomorphic-fetch';
import { baseURL } from '../api/api';


export function fetchCorporations(){
    return function(dispatch){
    	dispatch({ type: 'LOADING_CORPORATIONS' });

    	return fetch(baseURL + 'corporations')
    	.then( response => response.json())
    	.then(responseJSON => {
    		dispatch({ type: 'FETCH_CORPORATIONS', payload: responseJSON.data })
    	})
    	.catch( error => { throw(error) })
    }
}