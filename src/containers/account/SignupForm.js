import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { signupAccount } from '../../actions/accountActions'

class SignupForm extends Component {
    constructor(props){
        super(props)

        this.state = {
            credentials: {
                email: '',
                password: '',
                passwordConfirmation: '',
                accountType: ''
            }
            
        }
    }
    
    handelSignupSubmit = (event) => { 
        const { password, passwordConfirmation } = this.state.credentials    
        event.preventDefault();
        if (password === passwordConfirmation){
            this.props.signupAccount(this.state.credentials)
        } 
    }

    handelInputChange = (event) => {
        const field = event.target.name;
        const credentials = this.state.credentials;
        credentials[field] = event.target.value;
        this.setState({ credentials: credentials });
    }

    render(){
        return(
            <div>
                <h2>Signup by Email</h2>
                <form onSubmit={event => this.handelSignupSubmit(event) } >
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

                  <input type="password"
                    name="passwordConfirmation"
                    label="Password Confirmation"
                    placeholder="Confirm password"
                    value={this.state.credentials.passwordConfirmation}
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
                    <input type="submit" value="Create Account"/>
                </form>     
            </div>     
        )
    }
}

const mapDispatchToprops = (dispatch) => {
  return { signupAccount: bindActionCreators(signupAccount, dispatch) }
}

export default connect(null, mapDispatchToprops)(SignupForm)

