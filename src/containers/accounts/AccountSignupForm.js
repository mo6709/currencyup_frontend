import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { signupAccount } from '../../actions/accountActions';
import ErrorsDiv from '../../components/errors/ErrorsDiv';
import { Label, Icon, Input, Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
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
        }
    }

    handleInputChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    componentDidMount(prevProps){
        window.scrollTo(0, 720)
    }

    formValidation = () => {
        const { password, passwordConfirmation, name, email, accountType, title, firstName, lastName } = this.state; 
        if(password !== "" && password === passwordConfirmation && email !== "" && accountType !==""){
            switch(accountType){
                case "corporation":
                    return (name !== "" && title !== "");
                case "investor":
                    return (firstName !== "" && lastName !== "");
                default:
                    return false; 
            }      
        }else{
           return false;
        }
    }

    handleSignupSubmit = (event) => {
        event.preventDefault();
        if (this.formValidation()){
            this.setState({errors: false}); 
            this.props.signupAccount(this.state, this.props.history)
        }else{
            this.setState({ errors: "Please fill out all fields currenctly" }); 
        }
    }

    render(){
        const { accountType, email, password, passwordConfirmation, name, title, firstName, lastName } = this.state; 
        const { accountErrors } = this.props;
        return(
            <div className='login-form'>
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
                            <Image src='/logo.png' />
                            {' '}Sign-up to currencyUP 
                        </Header>
                        
                        <Form onSubmit={event => this.handleSignupSubmit(event)} size='large'>
                            <Segment stacked>
                               <Header>Select account type</Header>
                                <Button.Group size='large' style={{padding: 5}}>

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
                                            icon='lock' 
                                            iconPosition='left' 
                                            type='text' 
                                            value={name} 
                                            placeholder='Enter Name' 
                                            onChange={this.handleInputChange}/>
                                    </Form.Field>

                                    <Form.Field fluid >
                                        <Input
                                            name="title" 
                                            icon='lock' 
                                            iconPosition='left' 
                                            type='text' 
                                            value={title} 
                                            placeholder='Enter Title' 
                                            onChange={this.handleInputChange}/>
                                    </Form.Field>
                                </Segment>
                                
                                <Segment style={{ display: accountType === 'investor' ? 'block' : 'none' }}>
                                    <Form.Field fluid >
                                        <Input
                                            name="firstName" 
                                            icon='lock' 
                                            iconPosition='left' 
                                            type='text' 
                                            value={name} 
                                            placeholder='Enter First Name' 
                                            onChange={this.handleInputChange}/>
                                    </Form.Field>

                                    <Form.Field fluid >
                                        <Input
                                            name="lastName" 
                                            icon='lock' 
                                            iconPosition='left' 
                                            type='text' 
                                            value={title} 
                                            placeholder='Enter Last Name' 
                                            onChange={this.handleInputChange}/>
                                    </Form.Field>
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
        )
    }
}

const mapStateToProps = (state) => {
    return {
        accountErrors: state.account.errors
    }
}

const mapDispatchToProps = (dispatch) => {
  return { signupAccount: bindActionCreators(signupAccount, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountSignupForm)