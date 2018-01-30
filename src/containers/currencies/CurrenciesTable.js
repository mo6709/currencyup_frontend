import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'semantic-ui-react';
import RateGraph from '../../components/currencies/RateGraph';


class CurrenciesTable extends Component{
  constructor(props){
    super(props);

    this.state = {
    	graphTime: 'month'
    }
  }
  


  render(){
    
  	const tableRows = this.props.currencies.all.map(currency => {
  		const data = currency.monthly_rates.map((rate, index) => {
        return { x: index, y: rate }
  		})

      return (
        <Table.Row key={currency.id}>
	        <Table.Cell>{currency.name}</Table.Cell>
	        <Table.Cell>{currency.rate}</Table.Cell>
	        <Table.Cell>
	        <RateGraph rateData={data} />
	        </Table.Cell>
	        <Table.Cell textAlign='right'>{currency.region}</Table.Cell>
	      </Table.Row>
      )
    })

    return (
      <Table unstackable>
		    <Table.Header>
		      <Table.Row>
		        <Table.HeaderCell>Name</Table.HeaderCell>
		        <Table.HeaderCell>Rate</Table.HeaderCell>
		        <Table.HeaderCell>Rate Graph</Table.HeaderCell>
		        <Table.HeaderCell textAlign='right'>Region</Table.HeaderCell>
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
		currencies: state.currencies
	}
}

export default connect(mapStateToProps)(CurrenciesTable);
