import fetch from 'isomorphic-fetch';
import { baseURL } from '../api/api';

export function fetchCurrencies() {
    return function(dispatch){
        dispatch({ type: 'LOADING_CURRENCIES' });
        
        return fetch(baseURL + 'currencies')
        .then(response => response.json())
        .then( responseJSON => {
        	const { status } = responseJSON;
        	if(status === "error" || status === 500){
                console.log("Somthing went wrong")
            }else{
            	dispatch({ type: 'FETCH_CURRENCIES', payload: responseJSON.data })
            }

        });
    }
}