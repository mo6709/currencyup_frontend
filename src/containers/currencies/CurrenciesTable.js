import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Icon, Container, Header } from 'semantic-ui-react';
import RateGraph from '../../components/currencies/RateGraph';
import PaginatedTable from '../PaginatedTable';

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
		        <Table.Cell>{currency.name}</Table.Cell>
		        <Table.Cell>{currency.rate}</Table.Cell>
		        <Table.Cell textAlign="left" >
		            <RateGraph rateData={data} />
		        </Table.Cell>
		        <Table.Cell >
		            <p style={{ color: `${color}`}}>
		                <b>{finalRate.toFixed(4)}% <Icon name={`caret ${arrow}`}/></b>
		            </p>
			    </Table.Cell>
		        <Table.Cell textAlign='right'>{currency.region}</Table.Cell>
		    </Table.Row>
        )
    })

    const tableHeaders = [
		<Table.HeaderCell>Name</Table.HeaderCell>,
		<Table.HeaderCell>Rate</Table.HeaderCell>,
		<Table.HeaderCell textAlign="center">Rate Graph</Table.HeaderCell>,
		<Table.HeaderCell>Change %</Table.HeaderCell>,
		<Table.HeaderCell textAlign='right'>Region</Table.HeaderCell>
	];

    return (
    	<Container>
    	    <Header as='h3'>Monthly Rate</Header>
		      <PaginatedTable headersData={tableHeaders} rowsData={tableRows} />
		</Container>   
    )
  }
}

const mapStateToProps = (state) => {
	return{
		currencies: state.currencies
	}
}

export default connect(mapStateToProps)(CurrenciesTable);
