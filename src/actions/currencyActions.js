import fetch from 'isomorphic-fetch'

export function fetchCurrencies() {
    return function(dispatch){
        dispatch({ type: 'LOAD_CURRENCIES' })

        return fetch('http://localhost:3000/api/v1/currencies')
        .then(response => response.json())
        .then( currenciesJSON => {
            dispatch({ type: 'FETCH_CURRENCIES', payload: currenciesJSON.data })
        });
    }
}