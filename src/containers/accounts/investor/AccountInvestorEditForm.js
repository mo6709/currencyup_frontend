import 'react-select/dist/react-select.css';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateAndSetAccountInfo } from '../../../actions/accountActions';
import ErrorsDiv from '../../../components/errors/ErrorsDiv';
import { Dropdown, Label, Icon, Input, Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';

class AccountInvestorEditForm extends Component{
    constructor(props){
    	super(props);
        
        const { id, email, first_name, last_name, region, avatar } = this.props.account.info;

    	this.state = {
            account: {
            	type: this.props.account.accountType,
            	id: id,
            	email: email,
            	firstName: first_name,
	    		lastName: last_name,
	    		region: region,
                avatar: avatar
	    	}	
    	}
    }
    
    handleInputChange = (event) => {
    	const { name, value } = event.target;
    	let newAccount = Object.assign({}, this.state.account);
    	newAccount[name] = value;
        this.setState({ account: newAccount })
    }

    handleSelectChange = (event, data) => {
        let newAccount = Object.assign({}, this.state.account);
        newAccount.region = data.value
        this.setState({ account: newAccount });
    } 

    handleAvatarChange = (event) => {
        event.preventDefault();
        let file = event.target.files[0]
        let newAccount = Object.assign({}, this.state.account);
        newAccount.avatar = file;
        this.setState({ account: newAccount }, console.log(this.state))
    }

    handleUpdateSubmit = (event) => {
    	event.preventDefault();
    	this.props.updateAccount(this.state.account, this.props.history)
    }

    render(){
    	const { email, firstName, lastName, region } = this.state.account;
        const { errors } = this.props.account;
    	const regions = this.props.currencies.all.map((currency) => {
            const regionName = `${currency.region.toLocaleLowerCase()}`;
            return { key: regionName, value: regionName, text: `${currency.region}` }
        });

    	return(
            <Segment stackable>
                {errors === "" ? "" : <ErrorsDiv messages={errors}/>}
		        <p><Icon name="info circle"/><b>Edit Info</b></p>
                <Form size='large'>
                    <Form.Field fluid >
                        <Input
                            name="email" 
                            icon='mail' 
                            iconPosition='left' 
                            type='email'
                            placeholder='E-mail address' 
                            value={email}
                            onChange={this.handleInputChange}/>
                    </Form.Field>
                  
                    <Form.Field fluid >
                        <Input
                            name="firstName" 
                            icon='user circle outline' 
                            iconPosition='left' 
                            type='text'
                            placeholder='Enter First Name'  
                            value={firstName}
                            onChange={this.handleInputChange}/>
                    </Form.Field>

                    <Form.Field fluid >
                        <Input
                            name="lastName" 
                            icon='user circle outline' 
                            iconPosition='left' 
                            type='text'
                            placeholder='Enter Last Name'  
                            value={lastName}
                            onChange={this.handleInputChange}/>
                    </Form.Field>

                    <Form.Field fluid>                            
                        <p style={{ float: 'left', margin: '1em', size: '50em' }}><Icon name="world"/><b>Region</b></p>
                        <Dropdown style={{ width: '12em' }} 
                            name="region"
                            placeholder='Select Your Region' 
                            float
                            search 
                            selection 
                            onChange={this.handleSelectChange}
                            value={region.toLocaleLowerCase()}
                            options={regions} />
                    </Form.Field>

                    <Form.Field fluid>                            
                        <p style={{ float: 'left', margin: '1em', size: '50em' }}><Icon name="world"/><b>Avatar</b></p>
                        <Input
                            name="avatar" 
                            icon='user circle outline' 
                            iconPosition='left' 
                            accept="image/*"
                            type='file'
                            onChange={this.handleAvatarChange}/>
                    </Form.Field>

                    <Button onClick={this.handleUpdateSubmit}><Icon name="send outline"/>Update Info</Button>
                </Form>
            </Segment>
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
		updateAccount: bindActionCreators(updateAndSetAccountInfo, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountInvestorEditForm);