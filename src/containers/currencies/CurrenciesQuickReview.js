import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'semantic-ui-react';
import RateGraph from '../../components/currencies/RateGraph';


class CurrenciesQuickReview extends Component{
  constructor(props){
    super(props);
  }
  


  render(){
    
  	const tableRows = this.props.currencies.all.map(currency => {
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

    return (
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
    )
  }
}

const mapStateToProps = (state) => {
	return{
		currencies: state.currencies
	}
}

export default connect(mapStateToProps)(CurrenciesQuickReview);
