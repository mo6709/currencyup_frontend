import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Segment } from 'semantic-ui-react';

class CorporationQuickView extends Component{
  constructor(props){
    super(props);
  }
 
  render(){
    let tableRows = "";
    if (!this.props.corporations.loading && !this.props.investments.loading){
	  	tableRows = this.props.corporations.all.map(corporation => {
	  		const { id, region_array, investment_period, name, title } = corporation;
	        let totalInvestments = 0;
	        this.props.investments.all.map(i => i.corporation_id === id ? totalInvestments += 1 : null)
			return (
				<Table.Row key={corporation.id}>
					<Table.Cell>{id}</Table.Cell>
					<Table.Cell>{name}</Table.Cell>
					<Table.Cell>{title}</Table.Cell>
					<Table.Cell>{totalInvestments}</Table.Cell>
					<Table.Cell textAlign='right'>{corporation.region}</Table.Cell>
				</Table.Row>
			)
	    })
	}

    return (
    	<Segment loading={this.props.investments.loading || this.props.corporations.loading } >
            <Table unstackable>
			    <Table.Header>
			      <Table.Row>
			        <Table.HeaderCell>Corporation Id</Table.HeaderCell>
			        <Table.HeaderCell>Corporation Name</Table.HeaderCell>
			        <Table.HeaderCell>Title</Table.HeaderCell>
			        <Table.HeaderCell>Total Investments</Table.HeaderCell>
			      </Table.Row>
			    </Table.Header>
			    <Table.Body>
			      {tableRows}
			    </Table.Body>
		    </Table>
		</Segment>     
    )
  }
}

const mapStateToProps = (state) => {
	return{
		investments: state.investments,
		corporations: state.corporations
	}
}

export default connect(mapStateToProps)(CorporationQuickView);
