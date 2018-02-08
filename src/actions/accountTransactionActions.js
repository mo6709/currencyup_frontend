import fetch from 'isomorphic-fetch';
import { getAndSetAccountInfo } from './accountActions';

export function persistInvestorTransaction(transactionData){
	return (dispatch) => {
		const dispatcher = dispatch;
		dispatcher({ type: 'TRANSACTION_PRESISTING' });
		const params = { transaction: transactionData };
		const uri = `https://currencyup-backend.herokuapp.com/api/v1/investors/${transactionData.investor_id}/transactions`;
		return fetch(uri, {
			method: 'POST',
			headers: { 'AUTHORIZATION': `${localStorage.token}`, 'Content-Type': 'application/json' },
			body: JSON.stringify(params)
		})
		.then(response => response.json())
		.then( responseJSON => {
			const { status } = responseJSON;
			
			if (status === "error" || status === 500){
				dispatcher({ type: 'TRANSACTION_PRESISTED_FAILUR', payload: responseJSON.messages || { error: "Somthing went wrong."} })
			}else {
				dispatcher({ type: 'TRANSACTION_PRESISTED_SUCCESS', payload: responseJSON.data });
				getAndSetAccountInfo(dispatcher, "investor");
			}
		})
		.catch(error => { throw(error) })
	}
}	