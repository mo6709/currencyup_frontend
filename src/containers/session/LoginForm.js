import React, { Component } from 'react';
import { connect } from 'react-redux';
// import * as accountActions from './actions/accouActntions'

class LoginForm extends Component{
    
    constructor(props){
        super(props);

        this.state = { 
            credentials: {
                email: '', 
                password: ''
            } 
        }
    }

    handelSigninSubmit = (event) => {
        //make a post request to api/v1/corporation_auth
        //send this peremeter in the body 
        //wait for response
        //save the token in local storage 
        //send the user to update the account
        event.preventDefault();
        fetch('api/v1/corporation_auth/sign_in', {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify(this.state.credentials)   
        })
        .then(response => response.json())
        .then(responseJSON => {
            console.log(responseJSON)
        })
        .catch(error => {
            console.log(error)
        })
    }

    handelInputChange = (event) => {
        const field = event.target.name;
        const credentials = this.state.credentials;
        credentials[field] = event.target.value;
        this.setState({ credentials: credentials });
    }

    render() {
        return(
            <div header='Register by Email' bsStyle='info' >
                <h2>Signin by Email</h2>
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

                    {/* <input type="password"
                    name="password_confirmation"
                    label="Password Confirmation"
                    placeholder="Enter password again"
                    value={this.state.password_confirmation}
                    onChange={this.handelInputChange}/>

                    <input type="text"
                    name="name"
                    label="Name"
                    placeholder="Enter name"
                    value={this.state.name}
                    onChange={this.handelInputChange}/> */}
                    
                    <input type="submit" />
                    {/* <button>
                        onClick={this.handelSigninClick}
                    </button>     */}
                </form>     
            </div>    
        )
    }
}

export default LoginForm;