import React from 'react';

const InvestorTransactionsList = ({ currenciesData, transactionsData }) => {
	const transactionDivs = transactionsData.map((transaction) => {
		const totalAmount = transaction.total_amount;
		const currency = currenciesData.all.find(c => c.id === transaction.currency_id);
		const tType = transaction.t_type === "to_corp" ? "Payed To": "Received From";
		const corporationName = transaction.corporation.name;
        const date = transaction.created_at.slice(0, 10)
        return(
        	<div key={transaction.id}>
        	    <p>
	    	       {totalAmount} {currency.name} {tType} {corporationName} at {date} 
	            </p>
        	</div>
        )
	})

	return(
		<div className="DottedBox">
		    <h3>Transactions</h3>
		    {transactionDivs}
		</div>
	)
}

export default InvestorTransactionsList;