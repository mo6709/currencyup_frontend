import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Segment, Container } from 'semantic-ui-react';
import PaginatedTable from '../PaginatedTable';

class InvestmentsQuickView extends Component{
	constructor(props){
	    super(props);
	}
 
    render(){
        let tableRows = "";
    	if (!this.props.investments.loading && !this.props.corporations.loading){
		  	tableRows = this.props.investments.all.map(investment => {
		  		const { active, corporation_id, return_rate, investment_date } = investment;
		        const corporation = this.props.corporations.all.find(c => c.id === corporation_id);
		        let corpName = "";
		        let investment_period = "";
		        if(corporation){
		            corpName = corporation.name;
		            investment_period = corporation.investment_period;
		        }
		        const id = investment.id
		        const activation = active ? "Active" : "Not Active";
		        const date = investment_date.slice(0, 10);

				return (
					<Table.Row key={investment.id}>
						<Table.Cell>{investment.id}</Table.Cell>
						<Table.Cell>{corpName}</Table.Cell>
						<Table.Cell>{return_rate}</Table.Cell>
						<Table.Cell>{investment_period} Months</Table.Cell>
						<Table.Cell>{activation}</Table.Cell>
						<Table.Cell>{date}</Table.Cell>
						<Table.Cell textAlign='right'>{investment.region}</Table.Cell>
					</Table.Row>
				)
		    })
	    }

	    const tableHeaders = [
	        <Table.HeaderCell>ID</Table.HeaderCell>,
			<Table.HeaderCell>Corporation Name</Table.HeaderCell>,
			<Table.HeaderCell>Return Rate</Table.HeaderCell>,
			<Table.HeaderCell>Investment Period</Table.HeaderCell>,
			<Table.HeaderCell>Active</Table.HeaderCell>,
			<Table.HeaderCell>Date</Table.HeaderCell>,
			<Table.HeaderCell textAlign='right'>Region</Table.HeaderCell>
		];

	    return (
	        <Container unstackable loading={this.props.investments.loading || this.props.corporations.loading} >
			    <PaginatedTable headersData={tableHeaders} rowsData={tableRows} />
		    </Container>
	    )
    }
}

const mapStateToProps = (state) => {
	return{
		investments: state.investments,
		corporations: state.corporations
	}
}

export default connect(mapStateToProps)(InvestmentsQuickView);
