import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { signupAccount } from '../../actions/accountActions'


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
            first_name: '',
            last_name: '',
        }
    }
    
    handelSignupSubmit = (event) => { 
        event.preventDefault();
        if (this.formValidation()){
            this.setState({errors: false}); 
            this.props.signupAccount(this.state, this.props.history)
        }else{
            this.setState({errors: true}); 
        }
    }

    handelInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    formValidation = () => {
        const { password, passwordConfirmation, name, email, accountType, title, first_name, last_name } = this.state; 
        if(password !== "" && passwordConfirmation === password && email !== "" && accountType !==""){
            switch(accountType){
                case "corporation":
                    return (name !== "" && title !== "");
                case "investor":
                    return (first_name !== "" && last_name !== ""); 
            }      
        }else{
           return false;
        }
    }

    render(){
        const { accountType, email, password, passwordConfirmation, name, title, first_name, last_name } = this.state; 
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
                            checked={accountType === "investor"}
                            onChange={this.handelInputChange}/>
                            Investor
                        </label>
                        {" or "}
                        <label>
                            <input type="radio"
                            name="accountType" 
                            value="corporation" 
                            checked={accountType === "corporation"}
                            onChange={this.handelInputChange}/>
                            Corporation
                        </label> 
                    </div> 

                    <label>Email: 
                        <input type="email"
                            name="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={this.handelInputChange}/>
                    </label><br/>

                    <label>Password: 
                        <input type="password"
                            name="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={this.handelInputChange}/>
                    </label><br/>

                    <label>Password Confirmation: 
                        <input type="password"
                            name="passwordConfirmation"
                            placeholder="Confirm password"
                            value={passwordConfirmation}
                            onChange={this.handelInputChange}/>
                    </label><br/>
                    
                    <div style={{ display: accountType === 'corporation' ? 'block' : 'none' }}> 
                        <label> Name: 
                            <input type="text"
                                name="name"
                                placeholder="Enter name"
                                value={name}
                                onChange={this.handelInputChange}/>
                        </label><br/> 

                        <label> Title:      
                            <input type="text"
                                name="title"
                                placeholder="Enter title"
                                value={title}
                                onChange={this.handelInputChange}/>
                        </label><br/>
                    </div>

                    <div style={{ display: accountType === 'investor' ? 'block' : 'none' }}>
                        <label> First Name: 
                            <input type="text"
                                name="first_name"
                                placeholder="Enter first name"
                                value={first_name}
                                onChange={this.handelInputChange}/>
                        </label><br/> 

                        <label> Last Name:      
                            <input type="text"
                                name="last_name"
                                placeholder="Enter last name"
                                value={last_name}
                                onChange={this.handelInputChange}/>
                        </label><br/>
                    </div>
 
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