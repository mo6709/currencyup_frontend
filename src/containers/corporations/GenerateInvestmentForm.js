import 'react-select/dist/react-select.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

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
	        	timePeriod: this.props.account.investment_period,
	            currency: '',
	            returnRate: '',
	            investment_date: new Date,
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
    
    handleSelectChange = (value) => { 
        const newState = Object.assign({}, this.state);
        newState.investment.currency = value
        this.setState(newState);
    }

    hendleCalendarSelect = (value) => {
    	this.setState({ investment: 
    		Object.assign({}, this.state.investment, { investment_date: value.toDateString() }) 
    	})
    }
    
    handleInvestmentSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.investment)
        if(this.formValidation()){
            console.log(this.state.investment)
            
        }else{
            this.setState({ errors: "Please fill out all areas"})
        }
    }

    formValidation = () => {
        const { currency, returnRate, investment_date, active } = this.state.investment;
        if(currency !== '' && returnRate !== '' && active !== null){ 
            return true;
        }else{
        	return false;
        }
    }

    render(){
    	const { stayOpen, disabled, removeSelected } = this.state.select;
    	const { currency, returnRate, investment_date, active } = this.state.investment;
    	const dateObject = new Date(investment_date);
    	const currencies = this.props.account.currencies.map((currency) => {
    		return { label: `${currency.name} - ${currency.acronym}`, value: currency.name }
    	});
        const date = new Date;
        const lastWeek = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7);
        
        return(
        	<div className="DottedBox">
        	  <h4>Generate Investment Form</h4>
        	  {this.state.errors}
        	    <form onSubmit={this.handleInvestmentSubmit}>
		        	<div>
	                    <label style={{width: '280px'}}>Currency:
		                    <Select
		                        closeOnSelect={!stayOpen}
		                        disabled={disabled}
		                        onChange={this.handleSelectChange}
		                        options={currencies}
		                        placeholder="Select Currency"
		                        removeSelected={removeSelected}
		                        simpleValue
		                        value={currency}/>
	                    </label>    
                    </div><br/>
                    
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
    	account: state.account.info
    }
}

const mapDispatchToProps = (dispatch) => {
	return{}
}


export default connect(mapStateToProps, mapDispatchToProps)(GenerateInvestmentForm);