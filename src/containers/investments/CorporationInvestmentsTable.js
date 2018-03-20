import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteCorporationInvestment } from '../../actions/investmentActions'; 
import ErrorsDiv from '../../components/errors/ErrorsDiv';
import { Label, Icon, Input, Button, Form, Grid, Header, Image, Message, Segment, Table } from 'semantic-ui-react';
import PaginatedTable from '../PaginatedTable';

class CorporationInvestmentsTable extends Component{
    constructor(props){
        super(props);
    }

    handleDelete = investmentId => (event) => {
    	event.preventDefault();
        this.props.deleteCorporationInvestment(investmentId);
    }
    
    render(){
        const { corporation_investments } = this.props.account.info;
        const { currencies } = this.props;

    	const tableRows = corporation_investments.map((investment) => {
			if(investment.active){
				const { region, currency_id, return_rate, investment_date, created_at } = investment;
				const currency = currencies.find(c => c.id === currency_id)
				let currencyName = "";
				if(currency){
					currencyName = currency.name;
				}
				const id = investment.id;
				const returnRate = return_rate;
				const investmentDate = investment_date.slice(0, 10)
				const createdAt = created_at.slice(0, 10)
				return(
					<Table.Row key={id} className="investment">
						<Table.Cell>{id}</Table.Cell>
						<Table.Cell>{region}</Table.Cell>
						<Table.Cell>{currency.iso_code}</Table.Cell>
						<Table.Cell>{return_rate}</Table.Cell>
						<Table.Cell>{investmentDate}</Table.Cell>
						<Table.Cell textAlign='right'><Button onClick={ this.handleDelete(id) }>Delete</Button></Table.Cell>
					</Table.Row>
				)
			}
		})
		const tableHeaders = [
		    <Table.HeaderCell>ID</Table.HeaderCell>,
	        <Table.HeaderCell>Region</Table.HeaderCell>,
	        <Table.HeaderCell>Currency</Table.HeaderCell>,
	        <Table.HeaderCell>Return Rate</Table.HeaderCell>,
	        <Table.HeaderCell>Start Date</Table.HeaderCell>,
	        <Table.HeaderCell textAlign='right'><Icon name="delete"/></Table.HeaderCell>
	    ];
		return(
			<Segment>
			    <PaginatedTable headersData={tableHeaders} rowsData={tableRows} /> 
			</Segment>
		)
    }

}


const mapStateToProps = (state) => {
    return {
        account: state.account,
        currencies: state.currencies.all
    }
}

const mapDispatchToProps = (dispatch) => {
  return { deleteCorporationInvestment: bindActionCreators(deleteCorporationInvestment, dispatch) } 
}

export default connect(mapStateToProps, mapDispatchToProps)(CorporationInvestmentsTable);

