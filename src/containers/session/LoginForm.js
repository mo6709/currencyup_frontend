import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import * as sessionActions from '../../actions/sessionActions';
import fetch from 'isomorphic-fetch';
import ErrorsDiv from '../../components/errors/ErrorsDiv';
import { Container, Label, Icon, Input, Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';

class LoginForm extends Component{
    
    constructor(props){
        super(props);

        this.state = { 
            errors: '',
            credentials: {
                email: '', 
                password: '', 
                accountType: ''      
            } 
        }
    }

    handleInputChange = (event) => {
        event.preventDefault();
        const field = event.target.name;
        const credentials = this.state.credentials;
        credentials[field] = event.target.value;
        this.setState({ credentials: credentials });

    }

    handleSigninSubmit = (event) => {
        const { accountType, email, password } = this.state.credentials    
        event.preventDefault();
        if(accountType !== '' && email !== '' && password !== ''){
            this.setState({ errors: '' });
            this.props.sessionActions.loginAccount(this.state.credentials, this.props.history);
        }else{
            this.setState({ errors: 'Please fill out the form currectly, and choose account type' })
        }
    }

    render() {
        const { email, password, accountType } = this.state.credentials;
        const { errors } = this.props.session;
        
        return(
            <div id="login-sec">
                <Container  style={{padding: '6em'}}>
                    <div  className='login-form'>

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
                                    {/*<Image src='../../../public/UP.png' />*/}
                                    {' '}Log-in to your account
                                </Header>
                                
                                <Form onSubmit={event => this.handleSigninSubmit(event)} size='large'>
                                    <Segment stacked>
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
                                    
                                        <Button color='gray' fluid size='large'>Login</Button>
                                    </Segment>
                                </Form>
                                <Message>
                                    New to us? <Link to="/signup">Sign Up</Link> 
                                    {errors === "" ? "" : <ErrorsDiv messages={errors}/>}
                                    <p>{this.state.errors}</p>
                                </Message>
                            </Grid.Column>
                        </Grid>
                    </div> 
                </Container>
            </div> 
        )
    }
}

const mapStateToProps = (state) => {
    return { session: state.session }
}

const mapDispatchToProps = (dispatch) => {
    return { sessionActions: bindActionCreators(sessionActions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);