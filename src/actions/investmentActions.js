import fetch from 'isomorphic-fetch';
import { baseURL } from '../api/api';

export function fetchInvestments() {
    return function(dispatch){
        dispatch({ type: 'LOADING_INVESTMENTS' });

        return fetch(baseURL + 'corporation_investments')
        .then(response => response.json())
        .then( currenciesJSON => {
            dispatch({ type: 'FETCH_INVESTMENTS', payload: currenciesJSON.data })
        })
        .catch( error => { throw(error) })
    }
}

export function generateInvestment(investmentInfo, routerHistory){
	return function(dispatch){
		dispatch({ type: 'GENERATING_CORPORSTION_INVESTMENT' });

		const id = investmentInfo.corporationId;
        const uri = baseURL + `corporations/${id}/corporation_investments`;
        const { currencyId, returnRate, investmentDate, active, region } = investmentInfo;
		const parameters = { 
			corporation_investment: {
	            currency_id: currencyId, 
	            return_rate: parseFloat(returnRate), 
	            investment_date: investmentDate,
	            active: active,
	            region: region 
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
			const { status } = responseJSON;
			if(status === "error" || status === 500){
                dispatch({ type: 'GENERATE_CORPORSTION_INVESTMENT_FAILUR', payload: responseJSON.messages || { error: "Somthing went wrong." } })
			}else{
				dispatch({ type: 'GENERATE_CORPORSTION_INVESTMENT_SUCCESS', payload: responseJSON.data });
				fetchInvestments();
				routerHistory.replace(`/account/corporations/${id}`);
			}
		})
		.catch(error => { throw(error) })
	}
}

export function deleteCorporationInvestment(investmentId){
    return function(dispatch){
    	dispatch({ type: 'DELETING_CORPORSTION_INVESTMENT' });

    	const corporationId = localStorage.account_id;
        const uri = baseURL + `corporations/${corporationId}/corporation_investments/${investmentId}`;
    	return fetch(uri, { 
    		method: 'DELETE',
    		headers: { 
    			'AUTHORIZATION': `${localStorage.token}`,
                'Content-Type': 'application/json' 
            }
    	})
    	.then(response => response.json())
        .then(responseJSON => {
        	const { status } = responseJSON;
			if(status === "error" || status === 500){
                dispatch({ type: 'DELETE_CORPORSTION_INVESTMENT_FAILUR', payload: responseJSON.messages || { error: "Somthing went wrong." } })
			}else{
				dispatch({ type: 'DELETE_CORPORSTION_INVESTMENT_SUCCESS', payload: responseJSON.data });
				fetchInvestments();
			}
        })
        .catch(error => { throw(error) })
    }   
}





