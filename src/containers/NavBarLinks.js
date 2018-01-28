import React, { Component } from 'react';
import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as currencyActions from '../actions/currencyActions';
import { logoutAccount } from '../actions/sessionActions';


class NavBarLinks extends Component{
	constructor(props){
		super(props);

		this.state = {}
	}

	logOut = (event) => {
        const { logoutAccount, history } = this.props; 
        event.preventDefault();
        logoutAccount(history);
    }

	render(){
        const { loggedIn, account } = this.props
    
	    let navLinks = null;
	    if(loggedIn && account.accountType === "investor"){
	        navLinks = <div className="links">
	            <NavLink style={{ marginRight: '10px' }} activeStyle={{ background: 'darkblue' }} exact to={`/account/investors/${account.info.id}`}>Account: {account.info.first_name}</NavLink>
	            <NavLink onClick={this.logOut} style={{ marginRight: '10px' }} activeStyle={{ background: 'darkblue' }} exact to={this.props.match.url}>Logout</NavLink>
	        </div> 
	    }else if(loggedIn && loggedIn && account.accountType === "corporation"){
	        navLinks = <div className="links">
	            <NavLink style={{ marginRight: '10px' }} activeStyle={{ background: 'darkblue' }} exact to={`/account/corporations/${account.info.id}`}>Account: {account.info.name}</NavLink>
	            <NavLink onClick={this.logOut} style={{ marginRight: '10px' }} activeStyle={{ background: 'darkblue' }} exact to={this.props.match.url}>Logout</NavLink>
	        </div>
	    }else{
	        navLinks = <div className="links">
	            <NavLink style={{ marginRight: '10px' }} activeStyle={{ background: 'darkblue' }} exact to="/login">Login</NavLink> 
	            <NavLink style={{ marginRight: '10px' }} activeStyle={{ background: 'darkblue' }} exact to="/signup">Signup</NavLink>
	        </div>
	    }

		return(
			<div>
	            <NavLink style={{ marginRight: '10px' }} to="/currencies">See All The Currencies!</NavLink>
	            {navLinks}
            </div>
        )
	}
}

const mapStateToProps = (state) => {
  return {
    account: state.account,
    loggedIn: state.session.loggedIn, 
    currencies: state.currencies
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    currencyActions: bindActionCreators(currencyActions, dispatch),
    logoutAccount: bindActionCreators(logoutAccount, dispatch) 
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(NavBarLinks);