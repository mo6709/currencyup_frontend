import 'react-select/dist/react-select.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Select from 'react-select';
import { updateAndSetAccountInfo } from '../../../actions/accountActions';
import ErrorsDiv from '../../../components/errors/ErrorsDiv';
import { Label, Icon, Input, Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';


class AccountCorporationEditForm extends Component{
    constructor(props){
        super(props);

        this.state = {
            select: {
                removeSelected: true,
                disabled: false,
                stayOpen: false,
            }      
        }
    }


    componentWillMount(){
        const { info, accountType } = this.props.account;
        const newState = Object.assign({}, this.state);
        newState.account = info;
        newState.account["type"] = accountType
        this.setState(newState);
    }

    handleInputChange = (event) => {
        const { name, value } =  event.target;
        const parsedValue = name === "investment_period" ? parseInt(value) : value
        this.setState({ account: Object.assign({}, this.state.account, { [name]: parsedValue }) });
    }

    handleSelectChange = (value) => {        
        const newState = Object.assign({}, this.state);
        newState.account.regions_array = value.split(",") 
        this.setState(newState);
    }

    handleEditSubmit = (event) => {
        event.preventDefault();
        this.props.updateAndSetAccountInfo(this.state.account, this.props.history)
    }


    render(){
        const { disabled, stayOpen } = this.state.select;
        const { email, name, title, regions_array, investment_period } = this.state.account;
        const { errors } = this.props.account;
        let regions = this.props.currencies.map((currency) => {
            return { label: currency.region, value: currency.region }
        });
       
        return( 
            <div style={{ height: '42em'}} className="DottedBox">
                <Segment>
                {errors === "" ? "" : <ErrorsDiv messages={errors}/>}
                <Segment stackable >
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
                                name="name" 
                                icon='building' 
                                iconPosition='left' 
                                type='text'
                                placeholder='Enter Name'  
                                value={name}
                                onChange={this.handleInputChange}/>
                        </Form.Field>

                        <Form.Field fluid >
                            <Input
                                name="title" 
                                icon='file text outline' 
                                iconPosition='left' 
                                type='text'
                                placeholder='Enter Title'  
                                value={title}
                                onChange={this.handleInputChange}/>
                        </Form.Field>
                    </Form>
                </Segment>

                <Segment >
                    <Icon name="time"/>
                    <b>Select Investments Period</b><br/>
                    <Button.Group>
                        <Button name="investment_period"
                            value="2"
                            onClick={this.handleInputChange}>2
                        </Button>
                        <Button.Or />
                        <Button name="investment_period"
                            value="4"
                            onClick={this.handleInputChange}>4
                        </Button>
                        <Button.Or />
                        <Button name="investment_period"
                            value="6"
                            onClick={this.handleInputChange}>6
                        </Button>
                    </Button.Group><br/>
                    <b>Months</b>
                </Segment>

                <Segment>
                    <p>
                        <Icon name="world"/>
                        <b>Select Regions</b>
                    </p>
                    <Select
                        closeOnSelect={!stayOpen}
                        disabled={disabled}
                        multi
                        onChange={this.handleSelectChange}
                        options={regions}
                        placeholder="Select investment regions"
                        removeSelected={this.state.select.removeSelected}
                        rtl={this.state.select.rtl}
                        simpleValue
                        value={regions_array}/>
                </Segment>

                <Segment>
                    <Button onClick={event => this.handleEditSubmit(event)} color='gray' fluid size='large' icon="external">Subbmit Info{"     "}<Icon name="external"/></Button>
                </Segment>
                </Segment>
            </div> 
        )
    }
}

const mapStateToProps = (state) => {
    return { 
        account: state.account, 
        currencies: state.currencies.all 
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateAndSetAccountInfo: bindActionCreators(updateAndSetAccountInfo, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AccountCorporationEditForm);
