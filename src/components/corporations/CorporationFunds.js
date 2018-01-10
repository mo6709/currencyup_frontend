import React from 'react';

const CorporationFunds = ({ currenciesInfo }) => {
	let fundDivs = currenciesInfo.map((fund) => {
		return(
			<div>
			  <p>ammount: {fund.total_amount} {fund.currency.name}</p>
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