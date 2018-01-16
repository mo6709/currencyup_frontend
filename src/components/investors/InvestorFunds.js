import React from 'react';

const InvestorFunds = ({ currenciesData }) => {
	let fundDivs = currenciesData.map((fund) => {
		return(
			<div key={fund.id}>
			    <p>amount: {fund.total_amount} {fund.currency.name}</p>
			</div>
		)
	})

	return(
		<div className="DottedBox">
		    <h3>Funds</h3>
            {fundDivs}
		</div>
	)
}

export default InvestorFunds;