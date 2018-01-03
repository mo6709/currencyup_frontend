import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { signupAccount } from '../../actions/accountActions'


class AccountSignupForm extends Component {
    constructor(props){
        super(props)

        this.state = {
            errors: null,
            credentials: {
                name: '',
                email: '',
                password: '',
                passwordConfirmation: '',
                accountType: '',
                title: ''
            }     
        }
    }
    
    handelSignupSubmit = (event) => { 
        event.preventDefault();
        if (this.formValidation(this.state.credentials)){
            this.setState({errors: false}); 
            this.props.signupAccount(this.state.credentials, this.props.history)
        }else{
            this.setState({errors: true}); 
        }
    }

    handelInputChange = (event) => {
        const field = event.target.name;
        const credentials = this.state.credentials;
        credentials[field] = event.target.value;
        this.setState({ credentials: credentials });
    }

    formValidation = (credentials) => {
       const { password, passwordConfirmation, name, email, accountType } = credentials 
       if(password !== "" &&
          passwordConfirmation === password &&
          name !== "" &&
          email !== "" &&
          accountType !==""){
           return true;
       }else{
           return false;
       }
    }

    render(){
        return(
            <div>               
                <h2>Signup by Email</h2>
                {this.state.errors === true ? <p>Please fill out all the fields currenctly</p> : ""}
                <p>{this.props.accountErrors ? this.props.accountErrors[0] : ''}</p>
                <form onSubmit={event => this.handelSignupSubmit(event) } >
                    <div>
                        {"Are you an "}
                        <label>
                            <input type="radio"
                            name="accountType"
                            value="investor" 
                            checked={this.state.credentials.accountType === "investor"}
                            onChange={this.handelInputChange}/>
                            Investor
                        </label>
                        {" or "}
                        <label>
                            <input type="radio"
                            name="accountType" 
                            value="corporation" 
                            checked={this.state.credentials.accountType === "corporation"}
                            onChange={this.handelInputChange}/>
                            Corporation
                        </label> 
                    </div> 

                    <label>Email: 
                        <input type="email"
                            name="email"
                            placeholder="Enter email"
                            value={this.state.credentials.email}
                            onChange={this.handelInputChange}/>
                    </label><br/>
                  
                    <label>Name: 
                        <input type="text"
                            name="name"
                            placeholder="Enter name"
                            value={this.state.credentials.name}
                            onChange={this.handelInputChange}/>
                    </label><br/>  

                    <label>Password: 
                        <input type="password"
                            name="password"
                            placeholder="Enter password"
                            value={this.state.credentials.password}
                            onChange={this.handelInputChange}/>
                    </label><br/>

                    <label>Password Confirmation: 
                        <input type="password"
                            name="passwordConfirmation"
                            placeholder="Confirm password"
                            value={this.state.credentials.passwordConfirmation}
                            onChange={this.handelInputChange}/>
                    </label><br/>

                    <label style={{display: this.state.credentials.accountType === 'corporation' ? 'block' : 'none'}}>
                        Title:      
                        <input type="text"
                            name="title"
                            placeholder="Enter title"
                            value={this.state.credentials.title}
                            onChange={this.handelInputChange}/>
                    </label><br/>
 
                    <input type="submit" value="Create Account"/>
                </form>     
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