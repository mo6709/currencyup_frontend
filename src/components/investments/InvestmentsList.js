import React from 'react';

const InvestmentsList = ({ investmentsData, corporationsData }) => {
	const investmentDivs = investmentsData.map((investment) => {
		const { active, corporation_id, return_rate, investment_date } = investment;

		const corporation = corporationsData.find(c => c.id === corporation_id);
		let corporationName = "";
		let returnRate = "";
        if (corporation){
        	corporationName = corporation.name;
		    returnRate = return_rate;
        }

		const activation = active === true ? "Active" : "Not Active";
		const investmentPeriod = corporation.investment_period;
		const date = investment_date.slice(0, 10);

        return(
        	<div key={investment.id}>
        	  <p>{activation} | {corporationName} | {returnRate} for | {investmentPeriod} months | investment date {date}</p>
        	</div>
        )
	}) 

	return(
		<div className="DottedBox">
		    <p>Investments list</p>
		    {investmentDivs}
		</div>
	)
}

export default InvestmentsList;