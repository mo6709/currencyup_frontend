import fetch from 'isomorphic-fetch';

export function persistInvestorTransaction(transactionData){
	return (dispatch) => {
		dispatch({ type: 'TRANSACTION_PRESISTING' });
		const params = { transaction: transactionData };
		const uri = `http://localhost:3000/api/v1/investors/${transactionData.investor_id}/transactions`;
		return fetch(uri, {
			method: 'POST',
			headers: { 'AUTHORIZATION': `${localStorage.token}`, 'Content-Type': 'application/json' },
			body: JSON.stringify(params)
		})
		.then(response => response.json())
		.then( resopnseJSON => {
			if (resopnseJSON.status === "error" || resopnseJSON.status === 500){
				dispatch({ type: 'TRANSACTION_PRESISTED_FAILUR' })
			}else {
				dispatch({ type: 'TRANSACTION_PRESISTED_SUCCESS', payload: resopnseJSON.data.slice(-1)[0] });
                dispatch({ type: 'ACCOUNT_TRANSACTIONS_UPDATE', payload: resopnseJSON.data })
			}
		})
		.catch(error => { throw(error) })
	}
}	