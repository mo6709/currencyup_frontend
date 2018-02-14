import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { signupAccount } from '../../actions/accountActions';
import ErrorsDiv from '../../components/errors/ErrorsDiv';
import { Dropdown, Container, Label, Icon, Input, Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
class AccountSignupForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            errors: null,
            name: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            accountType: '',
            title: '',
            firstName: '',
            lastName: '',
            region: '',
            investment_period: 2,
            currency: { id: '', amount: 0 },
        }
    }

    handleInputChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        const parsedValue = name === "investment_period" ? parseInt(value) : value
        this.setState({ [name]: parsedValue });
    }

    handleSelectChange = (event, data) => {
        event.preventDefault();
        this.setState({ 
            currency: Object.assign({}, this.state.currency, { id: data.value }) 
        });
    }

    handleEnterAmount = (event) => {
        this.setState({ 
            currency: Object.assign({}, this.state.currency, { amount: event.target.value }) 
        })
    }
    
    setErrors = (type) =>  { 
        const message = type === "select" ? "Please select account type" : "Please fill out all fields currenctly"; 
        this.setState({ errors: message });
        return false;
    }

    formValidation = () => {
        const { password, passwordConfirmation, name, email, accountType, title, firstName, lastName, region, currency } = this.state; 
        if(accountType !== ""){
            if(password !== "" 
                && password === passwordConfirmation 
                && email !== "" 
                && accountType !=="" 
                && currency.id !=='' 
                && currency.id !== 0){
                switch(accountType){
                    case "corporation":
                        return (name !== "" && title !== "") ? true : this.setErrors('fields');
                    case "investor":
                        return (firstName !== "" && lastName !== "" && region !=="") ? true : this.setErrors('fields');
                    default:
                        return this.setErrors('fields'); 
                }      
            }else{
               return this.setErrors('fields'); 
            }
        }else{ 
            return this.setErrors('select'); 
        }
    }

    handleSignupSubmit = (event) => {
        event.preventDefault();
        if (this.formValidation()){
            this.setState({errors: false}); 
            this.props.signupAccount(this.state, this.props.history)
        }
    }

    render(){
        const { accountType, email, password, passwordConfirmation, name, title, firstName, lastName, region, investment_period } = this.state; 
        const { accountErrors, currencies } = this.props;
        const allCurrencies = this.props.currencies.all.map((currency) => {
            return { key: currency.id, value: currency.id, text: `${currency.region} - ${currency.iso_code}` }
        });

        const currencySelection = <Container>
            <Header>Put money in your account</Header>
            <Form.Group inline>
                <Form.Field fluid >
                    <Dropdown style={{ width: '12em' }} 
                        label="Currency"
                        name="currency"
                        placeholder='Select Currency' 
                        float
                        search 
                        selection 
                        onChange={this.handleSelectChange}
                        value={this.state.currency.id}
                        options={allCurrencies} />
                </Form.Field>

                <Form.Field fluid >
                    <Input style={{ width: "8em" }} 
                        
                        name="currencyAmount"
                        type='number' 
                        value={this.state.currency.amount} 
                        placeholder='Amount' 
                        onChange={this.handleEnterAmount}/>
                </Form.Field>
            </Form.Group>
        </Container>;

        return(
            <Container style={{padding: '6em'}}> 
                <div id="signup-sec" className='login-form'>
                    <style>{`
                        body > div,
                        body > div > div,
                        body > div > div > div.login-form {
                        height: 100%;
                        }
                    `}</style>
                    <Grid
                        textAlign='center'
                        style={{ height: '100%' }}
                        verticalAlign='middle'> 

                        <Grid.Column style={{ maxWidth: 450 }}>
                            <Header as='h2' color='gray' textAlign='center'>
                               {/*<Image src='/logo.png' />*/}
                                {' '}Sign-up to currencyUP 
                            </Header>
                            
                            <Form onSubmit={event => this.handleSignupSubmit(event)} size='large'>
                                <Segment stacked>
                                   <Header>Select account type</Header>
                                    <Button.Group stackable size='large' style={{padding: 5}}>

                                        <Button onClick={this.handleInputChange} name="accountType" value="investor" icon labelPosition='left'>
                                            <Icon name='user'/>
                                            Investor
                                        </Button>
                                        <Button.Or />
                                        <Button onClick={this.handleInputChange}  name="accountType" value="corporation" icon labelPosition='right'>
                                            Corporation
                                            <Icon name='building'/>
                                        </Button>
                                    </Button.Group>

                                    <Form.Field fluid >
                                        <Input
                                            name="email" 
                                            icon='mail' 
                                            iconPosition='left' 
                                            type='email' 
                                            value={email} 
                                            placeholder='E-mail address' 
                                            onChange={this.handleInputChange}/>
                                    </Form.Field>
                                  
                                    <Form.Field fluid >
                                        <Input
                                            name="password" 
                                            icon='lock' 
                                            iconPosition='left' 
                                            type='password' 
                                            value={password} 
                                            placeholder='Password' 
                                            onChange={this.handleInputChange}/>
                                    </Form.Field>
                                    
                                    <Form.Field fluid >
                                        <Input
                                            name="passwordConfirmation" 
                                            icon='lock' 
                                            iconPosition='left' 
                                            type='password' 
                                            value={passwordConfirmation} 
                                            placeholder='Confirm Password' 
                                            onChange={this.handleInputChange}/>
                                    </Form.Field>
                                    
                                    <Segment style={{ display: accountType === 'corporation' ? 'block' : 'none' }}>
                                        <Form.Field fluid >
                                            <Input
                                                name="name" 
                                                icon='building' 
                                                iconPosition='left' 
                                                type='text' 
                                                value={name} 
                                                placeholder='Enter Name' 
                                                onChange={this.handleInputChange}/>
                                        </Form.Field>

                                        <Form.Field fluid >
                                            <Input
                                                name="title" 
                                                icon='file text outline' 
                                                iconPosition='left' 
                                                type='text' 
                                                value={title} 
                                                placeholder='Enter Title' 
                                                onChange={this.handleInputChange}/>
                                        </Form.Field>

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
                                        {currencySelection}
                                    </Segment>
                                    
                                    <Segment style={{ display: accountType === 'investor' ? 'block' : 'none' }}>
                                        <Form.Field fluid >
                                            <Input
                                                name="firstName" 
                                                icon='user circle outline' 
                                                iconPosition='left' 
                                                type='text' 
                                                value={firstName} 
                                                placeholder='Enter First Name' 
                                                onChange={this.handleInputChange}/>
                                        </Form.Field>

                                        <Form.Field fluid >
                                            <Input
                                                name="lastName" 
                                                icon='user circle outline' 
                                                iconPosition='left' 
                                                type='text' 
                                                value={lastName} 
                                                placeholder='Enter Last Name' 
                                                onChange={this.handleInputChange}/>
                                        </Form.Field>

                                        <Form.Field fluid >
                                            <Input
                                                name="region" 
                                                icon='world' 
                                                iconPosition='left' 
                                                type='text' 
                                                value={region} 
                                                placeholder='Enter Rigion' 
                                                onChange={this.handleInputChange}/>
                                        </Form.Field>
                                        {currencySelection}
                                    </Segment>

                                    <Button color='gray' fluid size='large'>Creat Account</Button>
                                </Segment>
                            </Form>
                            <Message>
                                Have an account? <Link to="/login">Login</Link> 
                                {accountErrors === "" ? "" : <ErrorsDiv messages={accountErrors}/>}
                                <p>{this.state.errors}</p>
                            </Message>
                        </Grid.Column>
                    </Grid>
                </div>
            </Container>        
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currencies: state.currencies,
        accountErrors: state.account.errors
    }
}

const mapDispatchToProps = (dispatch) => {
  return { signupAccount: bindActionCreators(signupAccount, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountSignupForm);