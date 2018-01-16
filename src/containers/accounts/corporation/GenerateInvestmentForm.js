import 'react-select/dist/react-select.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { bindActionCreators } from 'redux';
import * as investmentActions from '../../../actions/investmentActions';

import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css'; // only needs to be imported once


class GenerateInvestmentForm extends Component{ 
	constructor(props){
        super(props);

        this.state = {
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
	            active: null
	        },
        }
	}

	handleInputChange = (event) => {
        const { name, value } = event.target;
        const stringVal = value === "false" ? false : true;
        const parsedVal = name === "active" ? stringVal : value;
        this.setState({ investment: Object.assign({}, this.state.investment, { [name]: parsedVal }) })
	}
    
    handleCurrencySelectChange = (value) => {
        const newState = Object.assign({}, this.state);
        newState.investment.currencyId = value;
        this.setState(newState);
    }

    handleRegionSelectChange = (value) => {
        const newState = Object.assign({}, this.state);
        newState.investment.region = value;
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
        const { account } = this.props;
    	
    	const currencies = account.info.currencies.map((currency) => {
    		return { label: `${currency.name} - ${currency.acronym}`, value: currency.id }
    	});

        const regions = account.info.currencies.map(c => {
            return { label: `${c.region}`, value: `${c.region.toLocaleLowerCase()}`}
        })

    	const dateObject = new Date(investmentDate);
        const date = new Date();
        const lastWeek = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7);
        
        return(
        	<div className="DottedBox">
        	  <h4>Generate Investment Form</h4>

        	  {this.state.errors}
        	  {account.errors}

        	    <form onSubmit={this.handleInvestmentSubmit}>
		        	<div>
	                    <label style={{width: '280px'}}>Currency:
		                    <Select
                                name="currencyId"
		                        closeOnSelect={!stayOpen}
		                        disabled={disabled}
		                        onChange={this.handleCurrencySelectChange}
		                        options={currencies}
		                        placeholder="Select Currency"
		                        removeSelected={removeSelected}
		                        simpleValue
		                        value={currencyId}/>
	                    </label>    
                    </div><br/>
                    
                    <div>
                         <label style={{width: '280px'}}>Region:
                            <Select
                                name="region"
                                closeOnSelect={!stayOpen}
                                disabled={disabled}
                                onChange={this.handleRegionSelectChange}
                                options={regions}
                                placeholder="Select Region"
                                removeSelected={removeSelected}
                                simpleValue
                                value={region}/>
                        </label>
                    </div>

                    <div>
	                    <label>Return Rate:
	                        <input type="number"
	                            name="returnRate"
	                            placeholder="Return Rate in %"
	                            value={returnRate}
	                            onChange={this.handleInputChange}/>
			        	</label>
		        	</div><br/>
	                
	                <div>
			        	<label>Investment Date:
			        	    <InfiniteCalendar
							    width={280}
							    height={200}
							    selected={dateObject}
							    minDate={lastWeek}
							    onSelect={this.hendleCalendarSelect}/>
	                    </label>
                    </div><br/>
                    
                    <div> 
			        	<label>Should the investment be active at the investment date? <br/>
			        	    <label>Yes 
				        	    <input type="Radio"
				        	        value={true}
		                            name="active"
		                            checked={active}
				        	        onChange={this.handleInputChange}/>
			        	    </label>

			        	    {" "}

			        	    <label>No
				        	    <input type="Radio"
				        	        value={false}
		                            name="active"
		                            checked={active === null ? false : !active}
				        	        onChange={this.handleInputChange}/>
			        	    </label>    
			        	</label>
		        	</div><br/>

		        	<input type="submit" value="Generate Investment"/>
		        </form>	  
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
    	account: state.account
    }
}

const mapDispatchToProps = (dispatch) => {
	return{
		investmentActions: bindActionCreators(investmentActions, dispatch)
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(GenerateInvestmentForm);