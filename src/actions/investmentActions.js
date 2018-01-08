import fetch from 'isomorphic-fetch'

export function fetchInvestments() {
    return function(dispatch){
        dispatch({ type: 'LOAD_INVESTMENTS' });

        return fetch('http://localhost:3000/api/v1/corporation_investments')
        .then(response => response.json())
        .then( currenciesJSON => {
            dispatch({ type: 'FETCH_INVESTMENTS', payload: currenciesJSON.data })
        });
    }
}

export function generateInvestment(investmentInfo, routerHistory){
	return function(dispatch){
		dispatch({ type: 'GENERATING_INVESTMENT' });
		const id = investmentInfo.corporationId;
        const uri = `http://localhost:3000/api/v1/corporations/${id}/corporation_investments`;
        const { currencyId, returnRate, investmentDate, active } = investmentInfo;
		const parameters = { 
			corporation_investment: {
	            currency_id: currencyId, 
	            return_rate: parseFloat(returnRate), 
	            investment_date: investmentDate,
	            active: active 
			}
	    };
		return fetch(uri ,{
			method: 'POST',
			headers: { 
				'AUTHORIZATION': `${localStorage.token}`,
		        'Content-Type': 'application/json' 
		    }, body: JSON.stringify(parameters)  
		})
		.then(response => response.json())
		.then((responseJSON) => { 
			if(responseJSON.status === 'error'){
                dispatch({ type: 'FETCH_CORPORSTION_INVESTMENTS_FAILUR', messages: responseJSON.messages || "Somthing went wrong" })
			}else{
				dispatch({ type: 'FETCH_CORPORSTION_INVESTMENTS_SUCCESS', payload: responseJSON.data });
				routerHistory.replace(`/account/corporations/${id}`);
			}
		})
		.catch( error => { throw(error) })
	}
}