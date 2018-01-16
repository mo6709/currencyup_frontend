import React from 'react';

const CorporationInvestmentsList = ({ investmentsInfo }) => {
	const investmentDivs = investmentsInfo.map((investment) => {
		if(investment.active){
			const { region, currency, return_rate, investment_date, created_at } = investment 
			const currencyName = currency.name;
			const returnRate = return_rate;
			const investmentDate = investment_date.slice(0, 10)
			const createdAt = created_at.slice(0, 10)
			return(
				<div key={investment.id} className="investment">
	                <p>region: {region} | {currencyName}, Retun Rate: {returnRate} Created at: {createdAt}, Investment Data: {investmentDate}</p>
				</div>
			)
		}
	})
	return(
		<div className="investmentsList DottedBox">
		  <h3>Corporation's Active Investments</h3>
		  {investmentDivs}
		</div>
	)
}

export default CorporationInvestmentsList;