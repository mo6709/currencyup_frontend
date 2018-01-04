import React from 'react';

const InvestorsList = ({ investorsInfo }) => {
    let investors = investorsInfo.map((investor) => {
    	return(
	    	<div key={investor.id}>
                <p>Investor Id:{investor.id}</p>
                <p>Investor Name{`${investor.first_name} ${investor.last_name}`}</p>
	    	</div>
    	)
    })	
	return(
		<div className="DottedBox">
			<p>List of investors</p>
			{investors}
		</div>
	)	
}

export default InvestorsList;