import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as sessionActions from '../../actions/sessionActions';
import fetch from 'isomorphic-fetch';

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

    handleInputChange = (event) => {
        const field = event.target.name;
        const credentials = this.state.credentials;
        credentials[field] = event.target.value;
        this.setState({ credentials: credentials });
    }

    render() {
        const { email, password, accountType } = this.state.credentials;
        const { errors } = this.props.session;
        
        return(
            <div>
                <h2>Login by Email</h2>
                {errors}
                <p>{this.state.errors}</p>
                <form onSubmit={event => this.handleSigninSubmit(event) } >
                  <input type="email"
                    name="email"
                    label="Email"
                    placeholder="Enter email"
                    value={email}
                    onChange={this.handleInputChange}/>

                    <input type="password"
                    name="password"
                    label="Password"
                    placeholder="Enter password"
                    value={password}
                    onChange={this.handleInputChange}/>

                    <div>
                        <h3>Please select account type.</h3>
                        <div className="radio">
                            <label>
                                <input type="radio"
                                name="accountType"
                                value="investor" 
                                checked={accountType === "investor"}
                                onChange={this.handleInputChange}/>
                                Investor
                            </label>
                        </div>
                        <div className="radio">
                            <label>
                                <input type="radio"
                                name="accountType" 
                                value="corporation" 
                                checked={accountType === "corporation"}
                                onChange={this.handleInputChange}/>
                                Corporation
                            </label>
                        </div>
                    </div>    
                    <input type="submit" value="Login"/>
                </form>     
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