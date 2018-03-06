import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Table, Icon, Container, Header } from 'semantic-ui-react';
import RateGraph from '../../components/currencies/RateGraph';
import PaginatedTable from '../PaginatedTable';

class CurrenciesTable extends Component{
    constructor(props){
        super(props);

        this.state = {
        	graphTime: 'Monthly'
        }
    }

    hadleClick = event => {
        event.preventDefault();
        this.setState({ graphTime: event.target.name })
    }

  render(){   
  	const tableRows = this.props.currencies.all.map(currency => {
        let rates;
        switch(this.state.graphTime){
            case 'Weekly':
                rates = currency.monthly_rates.slice(0, 7);
                break;
            case 'Monthly':
                rates = currency.monthly_rates;
                break;
            case 'Yearly':
                rates = currency.yearlly_rates;
                break;
            default:
                rates = currency.monthlly_rates;
                break;
        }

  		const data = rates.map((rate, index) => {
        return { x: index, y: rate }
  		})
        
        const startVal = rates[rates.length -1];
        const currentVal = rates[0];
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
            <Button name="Weekly" onClick={this.hadleClick}>Weekly</Button> 
            <Button name="Monthly" onClick={this.hadleClick}>Monthly</Button> 
            <Button name="Yearly" onClick={this.hadleClick}>Yearly</Button>

    	    <Header as='h3'>{this.state.graphTime} Rate</Header>
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
