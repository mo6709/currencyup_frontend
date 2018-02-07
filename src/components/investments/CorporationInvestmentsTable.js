import React from 'react';
import { Table, Segment, Icon } from 'semantic-ui-react';
import PaginatedTable from '../../containers/PaginatedTable';

const CorporationInvestmentsTable = ({ investmentsData, currenciesData }) => {
	const tableRows = investmentsData.map((investment) => {
		if(investment.active){
			const { region, currency_id, return_rate, investment_date, created_at } = investment;
			const currency = currenciesData.all.find(c => c.id === currency_id)
			let currencyName = "";
			if(currency){
				currencyName = currency.name;
			}
			const returnRate = return_rate;
			const investmentDate = investment_date.slice(0, 10)
			const createdAt = created_at.slice(0, 10)
			return(
				<Table.Row key={investment.id} className="investment">
					<Table.Cell>{investment.id}</Table.Cell>
					<Table.Cell>{region}</Table.Cell>
					<Table.Cell>{currency.iso_code}</Table.Cell>
					<Table.Cell>{return_rate}</Table.Cell>
					<Table.Cell textAlign='right'>{investmentDate}</Table.Cell>
				</Table.Row>
			)
		}
	})
	const tableHeaders = [
	    <Table.HeaderCell>ID</Table.HeaderCell>,
        <Table.HeaderCell>Region</Table.HeaderCell>,
        <Table.HeaderCell>Currency</Table.HeaderCell>,
        <Table.HeaderCell>Return Rate</Table.HeaderCell>,
        <Table.HeaderCell textAlign='right'>Start Date</Table.HeaderCell>,
    ];

	return(
		<Segment>
		    <PaginatedTable headersData={tableHeaders} rowsData={tableRows} /> 
		</Segment>
	)
}

export default CorporationInvestmentsTable;