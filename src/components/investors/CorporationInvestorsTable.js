import React from 'react';
import { Table, Segment, Icon } from 'semantic-ui-react';
import PaginatedTable from '../../containers/PaginatedTable';

const CorporationInvestorsTable = ({ investorsInfo }) => {
	let uniqueIds = [];
	const filteredInvestors = investorsInfo.filter(investor => { 
		if(uniqueIds.includes(investor.id)){ 
			return false; 
		}else{ 
			uniqueIds.push(investor.id); 
			return true; 
		} 
	})

    const tableRows = filteredInvestors.map((investor) => {
    	return(
	    	<Table.Row key={investor.id} className="invstor">
				<Table.Cell>{investor.id}</Table.Cell>
				<Table.Cell textAlign='left'><Icon name="user"/>{`${investor.first_name} ${investor.last_name}`}</Table.Cell>
			</Table.Row>
    	)
    })	

    const tableHeaders = [ 
        <Table.HeaderCell>ID</Table.HeaderCell>,
		<Table.HeaderCell textAlign='left'>Name</Table.HeaderCell>
	];

	return(
		<Segment className="investorsTable">
		    <PaginatedTable headersData={tableHeaders} rowsData={tableRows} />
		</Segment>
	)	
}

export default CorporationInvestorsTable;