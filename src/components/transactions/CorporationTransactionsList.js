import React from 'react';

const CorporationTransactionsList = ({ transactionsData, currenciesData }) => {
	const transactionDivs = transactionsData.map((transaction) => {
		const currency = currenciesData.all.find((c) => c.id === transaction.currency_id)
		const transactionType = transaction.t_type.split("_").join(" ");
        return(
        	<div>
        	    <p>
                Investor: {transaction.investor.first_name} {transaction.investor.last_name} , 
                Currency: {currency.name} ,
                Transaction Type: {transactionType} ,
                Amount: {transaction.total_amount} , 
                Return Rate: {transaction.return_rate} , 
                Dolar Rate: {transaction.dolar_rate} 
                </p>
        	</div>
        )
	})

	return(
		<div className="DottedBox">
		    <h3>Corporation's Transactions</h3>
		    {transactionDivs}
		</div>
	)
}

export default CorporationTransactionsList;