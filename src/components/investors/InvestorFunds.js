import React from 'react';

const InvestorFunds = ({ currencyInvestorsData, currenciesData }) => {
	let fundDivs = currencyInvestorsData.map((fund) => {
		const currency = currenciesData.all.find(c => c.id === fund.currency_id);
		return(
			<div key={fund.id}>
			    <p>amount: {fund.total_amount} {currency.name}</p>
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