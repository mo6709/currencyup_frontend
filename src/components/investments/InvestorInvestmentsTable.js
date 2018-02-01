import React from 'react';
import { Table, Segment } from 'semantic-ui-react';

const InvestorInvestmentsTable = ({ transactionsData, currenciesData }) => {
	const tableRows = transactionsData.map((transaction) => {
	    const { corporation, total_amount, return_rate, corporation_investment } = transaction;
	    const corporationName = corporation.name;
	    const currency = currenciesData.all.find((c) => c.id === transaction.currency_id)
	    const investmentPeriod = corporation.investment_period;
	    var event = new Date(corporation_investment.investment_date);  
	    event.setMonth(investmentPeriod);
	    const dueDate = event.toDateString();
		return(
			<Table.Row key={transaction.id} className="investment">
				<Table.Cell>{corporationName}</Table.Cell>
				<Table.Cell>{total_amount}</Table.Cell>
				<Table.Cell>{currency.name}</Table.Cell>
				<Table.Cell>{return_rate}</Table.Cell>
				<Table.Cell textAlign='right'>{dueDate}</Table.Cell>
			</Table.Row>
		)	
	})
	return(
	    <Segment>
	        <Table unstackable>
			    <Table.Header>
			      <Table.Row>
			        <Table.HeaderCell>Corporation Name</Table.HeaderCell>
			        <Table.HeaderCell>Total Amount</Table.HeaderCell>
			        <Table.HeaderCell>Currency</Table.HeaderCell>
			        <Table.HeaderCell>Return Rate</Table.HeaderCell>
			        <Table.HeaderCell textAlign='right'>Due Date</Table.HeaderCell>
			      </Table.Row>
			    </Table.Header>

			    <Table.Body>
			      {tableRows}
			    </Table.Body>
		    </Table> 
		</Segment>
	)
}

export default InvestorInvestmentsTable;