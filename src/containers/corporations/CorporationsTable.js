import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Segment } from 'semantic-ui-react';

class CorporationsTable extends Component{
  constructor(props){
    super(props);
  }
 
  render(){
    let tableRows = "";
    if (!this.props.corporations.loading && !this.props.investments.loading){
	  	tableRows = this.props.corporations.all.map(corporation => {
	  		const { id, region_array, investment_period, name, title, created_at } = corporation;
	        let totalInvestments = 0;
	        this.props.investments.all.map(i => i.corporation_id === id ? totalInvestments += 1 : null)
			return (
				<Table.Row key={corporation.id}>
					<Table.Cell>{id}</Table.Cell>
					<Table.Cell>{name}</Table.Cell>
					<Table.Cell>{title}</Table.Cell>
					<Table.Cell>{region_array}</Table.Cell>
					<Table.Cell>{created_at.slice(0,10)}</Table.Cell>
					<Table.Cell textAlign='right'>{totalInvestments}</Table.Cell>
				</Table.Row>
			)
	    })
	}

    return (
        <Table loading={this.props.investments.loading || this.props.corporations.loading } unstackable>
		    <Table.Header>
		      <Table.Row>
		        <Table.HeaderCell>ID</Table.HeaderCell>
		        <Table.HeaderCell>Name</Table.HeaderCell>
		        <Table.HeaderCell>Title</Table.HeaderCell>
		        <Table.HeaderCell>Regions</Table.HeaderCell>
		        <Table.HeaderCell>Joined In</Table.HeaderCell>
		        <Table.HeaderCell textAlign="right">Total Investments</Table.HeaderCell>
		      </Table.Row>
		    </Table.Header>
		    <Table.Body>
		      {tableRows}
		    </Table.Body>
	    </Table>  
    )
  }
}

const mapStateToProps = (state) => {
	return{
		investments: state.investments,
		corporations: state.corporations
	}
}

export default connect(mapStateToProps)(CorporationsTable);
