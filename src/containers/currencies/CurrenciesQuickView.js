import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Segment } from 'semantic-ui-react';
import RateGraph from '../../components/currencies/RateGraph';


class CurrenciesQuickView extends Component{
  constructor(props){
    super(props);
  }
  


  render(){
    let tableRows = "";
    if(!this.props.currencies.loading){
	  	tableRows = this.props.currencies.all.map(currency => {
	  		const data = currency.monthly_rates.map((rate, index) => {
	        return { x: index, y: rate }
	  		})

	      return (
	        <Table.Row key={currency.id}>
		        <Table.Cell>{currency.iso_code}</Table.Cell>
		        <Table.Cell textAlign='right'>
		         <RateGraph rateData={data} />
		        </Table.Cell>
		      </Table.Row>
	      )
	    })
    }

    return (
        <Segment loading={this.props.currencies.loading}>
	        <Table unstackable>
			    <Table.Header>
			      <Table.Row>
			        <Table.HeaderCell>Name</Table.HeaderCell>
			        <Table.HeaderCell textAlign='center'>Rate Graph</Table.HeaderCell>
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
		currencies: state.currencies
	}
}

export default connect(mapStateToProps)(CurrenciesQuickView);
