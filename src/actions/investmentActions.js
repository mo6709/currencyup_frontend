import fetch from 'isomorphic-fetch'

export function fetchCurrencies() {
    return function(dispatch){
        dispatch({ type: 'LOAD_INVESTMENTS' })

        return fetch('/api/v1/corporation_investments')
        .then(response => response.json())
        .then( currenciesJSON => {
            dispatch({ type: 'FETCH_INVESTMENTS', payload: currenciesJSON.data })
        });
    }
}