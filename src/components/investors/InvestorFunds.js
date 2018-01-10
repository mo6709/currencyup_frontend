import React from 'react';

const InvestorFunds = ({ currenciesData }) => {
	debugger;
	let fundDivs = currenciesData.map((fund) => {
		return(
			<div key={fund.id}>
			    <p>amount: {fund.total_amount} {fund.currency.name}</p>
			</div>
		)
	})

	return(
		<div className="DottedBox">
		    <p>Funds</p>
            {fundDivs}
		</div>
	)
}

export default InvestorFunds;