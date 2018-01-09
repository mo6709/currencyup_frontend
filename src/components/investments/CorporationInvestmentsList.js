import React from 'react';

const CorporationInvestmentsList = ({ investmentsInfo }) => {
	debugger;
	const investmentDivs = investmentsInfo.map((investment) => {
		if(investment.active){
			const currencyName = investment.currency.name;
			const returnRate = investment.return_rate;
			const investment_date = investment.investment_date.slice(0, 10)
			const createdAt = investment.created_at.slice(0, 10)
			return(
				<div key={investment.id} className="investment">
	                <p>{currencyName}, Retun Rate: {returnRate} Created at: {createdAt}, Investment Data: {investment_date}</p>
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