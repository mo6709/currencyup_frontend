import React from 'react';

const InvestmentsList = ({ investmentsInfo }) => {
	const investmentDivs = investmentsInfo.map((investment) => {
		if(investment.active){
			const currencyName = investment.currency.name;
			const returnRate = investment.return_rate;
			const createdAt = investment.created_at.slice(0, 10)
			return(
				<div key={investment.id} className="investment">
	                <p>{currencyName}, Retun Rate: {returnRate} Created at: {createdAt}</p>
				</div>
			)
		}
	})
	return(
		<div className="investmentsList">
		  <h3>Corporation Investmens Active Investments</h3>
		  {investmentDivs}
		</div>
	)
}

export default InvestmentsList;