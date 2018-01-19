import React from 'react';

const CorporationFunds = ({ currencyCorporationsData, currenciesData }) => {
	let fundDivs = currencyCorporationsData.map((fund) => {
		const currency = currenciesData.all.find(c => c.id === fund.currency_id)
		return(
			<div>
			  <p>ammount: {fund.total_amount} {currency.name}</p>
			</div>
		)
	})
	return(
		<div className="DottedBox">
		    <p>Corporations Funds</p>
		    {fundDivs}
		</div>
	)
}

export default CorporationFunds;