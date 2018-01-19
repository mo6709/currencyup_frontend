import React from 'react';

const CorporationInvestorsList = ({ investorsInfo }) => {
	let uuniqueIds = [];
	const filteredInvestors = investorsInfo.filter(investor => { 
		if(uuniqueIds.includes(investor.id)){ 
			return false; 
		}else{ 
			uuniqueIds.push(investor.id); 
			return true; 
		} 
	})

    const investors = filteredInvestors.map((investor) => {
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

export default CorporationInvestorsList;