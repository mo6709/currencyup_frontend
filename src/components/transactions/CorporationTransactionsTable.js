import React from 'react';
import { Table, Segment } from 'semantic-ui-react';

const CorporationTransactionsTable = ({ transactionsData, currenciesData }) => {
	const tableRows = transactionsData.map((transaction) => {
		const currency = currenciesData.all.find((c) => c.id === transaction.currency_id)
		const type = transaction.t_type.split("_").join(" ");
        let transactionType;
        if(type === "from corp"){
            transactionType = "to investor"
        }else if(type === "to corp"){
            transactionType = "from investor"
        }else{
            transactionType = "purchase by corp"
        };
        const investorName = `${transaction.investor.first_name} ${transaction.investor.last_name}`;
        const date = transaction.created_at.slice(0, 10);

        return(
        	<Table.Row key={transaction.id} className="investment">
                <Table.Cell>{transaction.id}</Table.Cell>
                <Table.Cell>{transaction.total_amount}</Table.Cell>
                <Table.Cell>{investorName}</Table.Cell>
                <Table.Cell>{transactionType} </Table.Cell>
                <Table.Cell>{currency.name}</Table.Cell>
                <Table.Cell textAlign='right'>{date}</Table.Cell>
            </Table.Row>
        )
	})

	return(
		<Segment>
            <Table unstackable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>ID</Table.HeaderCell> 
                        <Table.HeaderCell>Total Amount</Table.HeaderCell> 
                        <Table.HeaderCell>Investor</Table.HeaderCell>
                        <Table.HeaderCell>Type</Table.HeaderCell>
                        <Table.HeaderCell>Currency</Table.HeaderCell>
                        <Table.HeaderCell textAlign='right'>Transaction Date</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                  {tableRows}
                </Table.Body>
            </Table> 
        </Segment>
	)
}

export default CorporationTransactionsTable;