import React from 'react';

const TransactionsList = ({ transactionsInfo, currencies }) => {
	const transactionDivs = transactionsInfo.map((transaction) => {
		const CurrencyName = currencies.all.find((c) => c.id == transaction.currency_id).name;
		const transactionType = transaction.t_type.split("_").join(" ");
        return(
        	<div>
        	    <p>
                Investor: {transaction.investor.first_name} {transaction.investor.last_name} , 
                Currency: {CurrencyName} ,
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

export default TransactionsList;