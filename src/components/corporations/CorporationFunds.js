import React from 'react';

const CorporationFunds = ({ currenciesInfo }) => {
	let funds = currenciesInfo.map((currency) => {
		return(
			<div>
			  <p>ammount: {currency.total_amount} {currency.currency.name}</p>
			</div>
		)
	})
	return(
		<div className="DottedBox">
		    <p>Corporations Funds</p>
		    {funds}
		</div>
	)
}

export default CorporationFunds;