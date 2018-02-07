import React from 'react';
import { Table, Segment } from 'semantic-ui-react';
import PaginatedTable from '../../containers/PaginatedTable';


const InvestorTransactionsList = ({ currenciesData, transactionsData }) => {
	const tableRows = transactionsData.map((transaction) => {
		// const totalAmount = transaction.total_amount;
		const currency = currenciesData.all.find(c => c.id === transaction.currency_id);
		const tType = transaction.t_type === "to_corp" ? "Payed To": "Received From";
		const corporationName = transaction.corporation.name;
        const date = transaction.created_at.slice(0, 10)
        return(
        	<Table.Row key={transaction.id} className="investment">
			    <Table.Cell>{transaction.id}</Table.Cell>
			    <Table.Cell>{transaction.total_amount}</Table.Cell>
				<Table.Cell>{corporationName}</Table.Cell>
				<Table.Cell>{tType} Corporation</Table.Cell>
				<Table.Cell>{currency.name}</Table.Cell>
				<Table.Cell textAlign='right'>{date}</Table.Cell>
			</Table.Row>
        )
	})
	
	const tableHeaders = [<Table.HeaderCell>ID</Table.HeaderCell>,
	    <Table.HeaderCell>Total Amount</Table.HeaderCell>,
	    <Table.HeaderCell>Corporation</Table.HeaderCell>,
	    <Table.HeaderCell>Type</Table.HeaderCell>,
	    <Table.HeaderCell>Currency</Table.HeaderCell>,
	    <Table.HeaderCell textAlign='right'>Transaction Date</Table.HeaderCell>
	];

	return(
		<Segment>
	        <PaginatedTable headersData={tableHeaders} rowsData={tableRows} /> 
		</Segment>
	)
}

export default InvestorTransactionsList;