import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Table, Segment } from 'semantic-ui-react';
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
            const startVal = currency.monthly_rates[currency.monthly_rates.length -1];
            const currentVal = currency.monthly_rates[0];
            const wholeValue = 100;
            let currentRate = (currentVal / startVal) * wholeValue;
            let finalRate = currentRate - (currentRate * 2);
            finalRate += wholeValue;

            const arrow = finalRate > 0 ? 'up' : 'down';
            const color = finalRate > 0 ? 'green' : 'red';

	        return (
		        <Table.Row key={currency.id}>
			        <Table.Cell>{currency.iso_code}</Table.Cell>
			        <Table.Cell >
			            <RateGraph rateData={data} />
			        </Table.Cell>
			        <Table.Cell textAlign='right'>
			            <p style={{ color: `${color}`}}>
			                <b>{finalRate.toFixed(4)}% <Icon name={`caret ${arrow}`}/></b>
			            </p>
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
			        <Table.HeaderCell textAlign='right'>Change %</Table.HeaderCell>
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
