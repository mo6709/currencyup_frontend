import fetch from 'isomorphic-fetch';

export function fetchCurrencies() {
    return function(dispatch){
        dispatch({ type: 'LOADING_CURRENCIES' });

        return fetch('http://localhost:3000/api/v1/currencies')
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