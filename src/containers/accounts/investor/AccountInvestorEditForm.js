import 'react-select/dist/react-select.css';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Select from 'react-select';

class AccountInvestorEditForm extends Component{
    constructor(props){
    	super(props);
        
        const { first_name, last_name } = this.props.account.info;

    	this.state = {
    		select: {
                removeSelected: true,
                disabled: false,
                stayOpen: false
            },
            account: {
            	firstName: first_name,
	    		lastName: last_name,
	    		region: null 
    	    }	
    	}
    }
    
    handleInpuChange = (event) => {
    	const { name, value } = event.target;
    	let newAccount = Object.assign({}, this.state.account);
    	newAccount[name] = value;
        this.setState({ account: newAccount })
    }

    handleSelectChange = (value) => {
        const newAccount = Object.assign({}, this.state.account);
        newAccount.region = value
        this.setState({ account: newAccount });
    }

    handleUpdateSubmit = (event) => {
    	event.preventDefault();
    }


    render(){
    	const { firstName, lastName, region } = this.state.account;
    	const { removeSelected, disabled, stayOpen } = this.state.select;
    	const regions = this.props.currencies.map((currency) => {
            return { label: currency.region, value: currency.region }
        });

    	return(
    		<div>
    		    <h3>Edit account info</h3>
    		    <form onSubmit={this.handleUpdateSubmit}>
                    <label>First Name:
                        <input type="text"
                            placeholder="Enter First Name"
                            name="firstName"
                            value={firstName}
                            onChange={this.handleInpuChange}/>
                    </label><br/>

                     <label>Last Name:
                        <input type="text"
                            name="lastName"
                            placeholder="Enter Last Name"
                            value={lastName}
                            onChange={this.handleInpuChange}/>
                    </label><br/>

                     <label style={{width: '280px'}}>Region:
                        <Select
	                        closeOnSelect={!stayOpen}
	                        disabled={disabled}
	                        onChange={this.handleSelectChange}
	                        options={regions}
	                        placeholder="Select Your Region"
	                        removeSelected={removeSelected}
	                        simpleValue
	                        value={region}/>
                    </label><br/>

    		        <input type="submit" value="Update Account" />
    		    </form>
    		</div>
    	)
    }	
}

const mapStateToProps = (state) => {
    return{ 
    	account: state.account,
    	currencies: state.currencies.all 
    }
}

const mapDispatchToProps = (dispatch) => {
	return{}
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountInvestorEditForm);