import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as sessionActions from '../../actions/sessionActions';

class LoginForm extends Component{
    
    constructor(props){
        super(props);

        this.state = { 
            credentials: {
                email: '', 
                password: '', 
                accountType: ''      
            } 
        }
    }

    handelSigninSubmit = (event) => {      
        event.preventDefault();
        this.props.sessionActions.loginAccount(this.state.credentials)
    }

    handelInputChange = (event) => {
        const field = event.target.name;
        const credentials = this.state.credentials;
        credentials[field] = event.target.value;
        this.setState({ credentials: credentials });
    }

    render() {
        return(
            <div>
                <h2>Login by Email</h2>
                <form onSubmit={event => this.handelSigninSubmit(event) } >
                  <input type="email"
                    name="email"
                    label="Email"
                    placeholder="Enter email"
                    value={this.state.credentials.email}
                    onChange={this.handelInputChange}/>

                    <input type="password"
                    name="password"
                    label="Password"
                    placeholder="Enter password"
                    value={this.state.credentials.password}
                    onChange={this.handelInputChange}/>

                    <div>
                        <h3>Please select account type.</h3>
                        <div className="radio">
                            <label>
                                <input type="radio"
                                name="accountType"
                                value="investor" 
                                checked={this.state.credentials.accountType === "investor"}
                                onChange={this.handelInputChange}/>
                                Investor
                            </label>
                        </div>
                        <div className="radio">
                            <label>
                                <input type="radio"
                                name="accountType" 
                                value="corporation" 
                                checked={this.state.credentials.accountType === "corporation"}
                                onChange={this.handelInputChange}/>
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

const mapDispatchToProps = (dispatch) => {
    return { sessionActions: bindActionCreators(sessionActions, dispatch) }
}

export default connect(null, mapDispatchToProps)(LoginForm);