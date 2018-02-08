import 'react-select/dist/react-select.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { bindActionCreators } from 'redux';
import * as investmentActions from '../../../actions/investmentActions';
import ErrorsDiv from '../../../components/errors/ErrorsDiv';

import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css'; // only needs to be imported once
import { Container, Radio, Modal, Dropdown, Label, Icon, Input, Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';


class GenerateInvestmentForm extends Component{ 
	constructor(props){
        super(props);

        this.state = {
            open: false,
        	errors: "",
        	select: {
                removeSelected: true,
                disabled: false,
                stayOpen: false
            },
            investment: {
                region: '',
            	corporationId: this.props.account.info.id,
	            currencyId: '',
	            returnRate: '',
	            investmentDate: new Date(),
	            active: false,
	        },
        }
	}

    show = size => () => this.setState({ size, open: true });
    close = () => this.setState({ open: false });
    toggle = () => {
        this.setState({ investment: 
            Object.assign({}, this.state.investment, 
                { active:  !this.state.investment.active 
            }) 
        }) 
    }
   
	handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ investment: Object.assign({}, this.state.investment, { [name]: value }) })
	}
    
    handleCurrencySelectChange = (event, data) => {
        const newState = Object.assign({}, this.state);
        newState.investment.currencyId = data.value;
        this.setState(newState);
    }

    handleRegionSelectChange = (event, data) => {
        const newState = Object.assign({}, this.state);
        newState.investment.region = data.value;
        this.setState(newState);
    }

    hendleCalendarSelect = (value) => {
    	this.setState({ investment: 
    		Object.assign({}, this.state.investment, { investmentDate: value.toDateString() }) 
    	})
    }

    formValidation = () => {
        const { currencyId, returnRate, active } = this.state.investment;
        if(currencyId !== '' && returnRate !== '' && active !== null){ 
            return true;
        }else{
        	return false;
        }
    }

    handleInvestmentSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.investment)
        if(this.formValidation()){
        	this.setState({ errors: "" })
            this.props.investmentActions.generateInvestment(this.state.investment, this.props.history)
        }else{
            this.setState({ errors: "Please fill out all areas" })
        }
    }

    render(){
    	const { stayOpen, disabled, removeSelected } = this.state.select;
    	const { currencyId, returnRate, investmentDate, active, region } = this.state.investment;
        const { account, currencies } = this.props;
    	const { open, size } = this.state

    	const currencyOptions = currencies.all.map((currency) => {
    		return { key: currency.id, value: currency.id, text: `${currency.name} - ${currency.iso_code}` }
    	});

        const regionOptions = currencies.all.map(c => {
            const regionName = `${c.region.toLocaleLowerCase()}`;
            return { key: regionName, value: regionName, text: `${c.region}` }
        })

    	const dateObject = new Date(investmentDate);
        const date = new Date();
        const lastWeek = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7);
        return(
        	<Container style={{ height: '37em' }} >
                <Segment stacked>
                    <Form size='large'>
                        <Form.Group>
                            <Form.Field fluid>
                                <p><b>Return Rate</b></p>
                                <Input name="returnRate" 
                                    placeholder="Return Rate in %"
                                    type='number'
                                    value={returnRate}
                                    onChange={this.handleInputChange}/>
                            </Form.Field>

                            <Form.Field fluid>
                                <p><b>Region</b></p>
                                <Dropdown name="region"
                                    placeholder='Select Region' 
                                    fluid
                                    search 
                                    selection 
                                    onChange={this.handleRegionSelectChange}
                                    value={region}
                                    options={regionOptions} />
                            </Form.Field>
                        </Form.Group>

                        <Form.Field fluid>                            
                            <p style={{ float: 'left', margin: '1em', size: '50em' }}><b>Currency</b></p>
                            <Dropdown style={{ width: '12em' }} 
                                name="currencyId"
                                placeholder='Select Currency' 
                                float
                                search 
                                selection 
                                onChange={this.handleCurrencySelectChange}
                                value={currencyId}
                                options={currencyOptions} />
                        </Form.Field>
                        
                        <Segment>
                            <p><b>Investment Date: {dateObject.toDateString()}</b></p>
                            <Button onClick={this.show('tiny')}>Select Starting Date</Button>
                            <Modal size={size} open={open} onClose={this.close}>
                                <Modal.Header textAlign="center">
                                    Investment Date:
                                </Modal.Header>
                                <Modal.Content >
                                    <Container style={{ margin: '0em 3em'}}>
                                    <InfiniteCalendar
                                        width={380}
                                        height={220}
                                        selected={dateObject}
                                        minDate={lastWeek}
                                        onSelect={this.hendleCalendarSelect} />
                                    </Container>
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button onClick={this.close} icon='checkmark' labelPosition='right' content='Done' />
                                </Modal.Actions>
                            </Modal>
                        </Segment>
                        
                        <Segment>
                            <p><b>Should the investment be active at the investment date? </b></p> 
                            <Radio toggle
                                name="active"
                                checked={this.state.investment.active}                                
                                onChange={this.toggle}/>
                        </Segment>
                        <Button onClick={this.handleInvestmentSubmit}>Submit Investment</Button>
                    </Form>
                </Segment>	 
                {this.state.errors}
                {account.errors === "" ? "" : <ErrorsDiv messages={account.errors}/>} 
            </Container>
            
        )
    }
}

const mapStateToProps = (state) => {
    return{
    	account: state.account,
        currencies: state.currencies
    }
}

const mapDispatchToProps = (dispatch) => {
	return{
		investmentActions: bindActionCreators(investmentActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(GenerateInvestmentForm);