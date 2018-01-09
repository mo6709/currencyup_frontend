import React from 'react';

const InvestorInvestmentsList = ({ transactionsData, currenciesData }) => {
	const investmentDivs = transactionsData.map((transaction) => {
	    const { corporation, total_amount, return_rate, corporation_investment } = transaction;
	    const corporationName = corporation.name;
	    const currency = currenciesData.all.find((c) => c.id === transaction.currency_id)
	    const investmentPeriod = corporation.investment_period;
	    var event = new Date(corporation_investment.investment_date);  
	    event.setMonth(investmentPeriod);
	    const dueDate = event.toDateString();
		return(
			<div key={transaction.id} className="investment">
                <p>Invested in {corporationName} {total_amount} {currency.name} return rate at {return_rate} by {dueDate}</p>
			</div>
		)	
	})
	return(
		<div className="InvestorInvestmentsList DottedBox">
		  <h3>Investments</h3>
		  {investmentDivs}
		</div>
	)
}

export default InvestorInvestmentsList;