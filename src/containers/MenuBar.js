import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Visibility,
} from 'semantic-ui-react';

import { logout } from '../actions/sessionActions';


class MenuBar extends Component {
    constructor(props){
    	super(props);
    }

    logOut = (event) => {
        const { logout, history } = this.props; 
        event.preventDefault();
        logout(history);
    }

    render(){
    	const { loggedIn, account } = this.props
    
	    let accountButtons = null;
	    if(loggedIn && account.accountType === "investor"){
	        accountButtons = <Menu.Item position='right'>
				<Button inverted as={Link} name='account' to={`${this.props.match.url}account/investors/${account.info.id}#investor-info`}>
                    {account.info.first_name}
                </Button>
				<Button inverted as={Link} name='logout' style={{ marginLeft: '0.5em' }} onClick={this.logOut} to={this.props.match.url}>
                    Logout
                </Button>
			</Menu.Item> 
	    }else if(loggedIn && loggedIn && account.accountType === "corporation"){
	        accountButtons = <Menu.Item position='right'>
				<Button inverted as={Link} name='account' to={`${this.props.match.url}account/corporations/${account.info.id}#corporation-info`}>
                    {account.info.name}
                </Button>
				<Button inverted name='logout' style={{ marginLeft: '0.5em' }} onClick={this.logOut} to={this.props.match.url}>
                    Logout
                </Button>
			</Menu.Item>
	    }else{
	        accountButtons = <Menu.Item position='right'>
				<Button inverted as={Link} name='login' to='login#login-sec'>
                    Log in
                </Button>
				<Button inverted as={Link} name='signup' style={{ marginLeft: '0.5em' }} to='signup#signup-sec'>
                    Sign Up
                </Button>
			</Menu.Item>
	    }

    	return(
    		<Menu inverted pointing secondary size='large'> 
                <Menu.Item as={Link} to='/#home-div' name='home'>Home</Menu.Item>
                <Menu.Item as={Link} to='/currencies#currencies-div' name='currencies'>Currencies</Menu.Item>
                <Menu.Item as={Link} to='/corporations#corporations-div' name='corporations'>Corporations</Menu.Item>
                <Menu.Item as={Link} to='/investments#investments-info' name='investments'>Investments</Menu.Item>
			    {accountButtons}
			</Menu>
    	)
    }  
}

const mapStateToProps = (state) => {
	return {
        account: state.account,
        loggedIn: state.session.loggedIn,
	}
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: bindActionCreators(logout, dispatch) 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar);