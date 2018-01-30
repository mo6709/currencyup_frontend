import React, { Component } from 'react';
import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom';
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

import { logoutAccount } from '../actions/sessionActions';


class FixedMenuBar extends Component {
    constructor(props){
    	super(props);
    }

    logOut = (event) => {
        const { logoutAccount, history } = this.props; 
        event.preventDefault();
        logoutAccount(history);
    }

    render(){
    	const { loggedIn, account } = this.props
    
	    let accountButtons = null;
	    if(loggedIn && account.accountType === "investor"){
	        accountButtons = <Menu.Menu position='right'>
		        <Menu.Item className='item'>
		            <Button as={ NavLink } to={`${this.props.match.url}account/investors/${account.info.id}`} name='account' >{account.info.first_name}</Button>
		        </Menu.Item>
		        <Menu.Item>
		            <Button as={ NavLink } to={this.props.match.url} name='logout' onClick={this.logOut} primary>Logout</Button>
		        </Menu.Item>
		    </Menu.Menu>

	    }else if(loggedIn && loggedIn && account.accountType === "corporation"){
	        accountButtons = <Menu.Menu position='right'>
		        <Menu.Item className='item'>
		            <Button as={ NavLink } to={`${this.props.match.url}account/corporations/${account.info.id}`} name='account' >{account.info.name}</Button>
		        </Menu.Item>
		        <Menu.Item>
		            <Button as={ NavLink } to={this.props.match.url} name='logout' onClick={this.logOut} primary>Logout</Button>
		        </Menu.Item>
		    </Menu.Menu>

	    }else{
	        accountButtons = <Menu.Menu position='right'>
		        <Menu.Item className='item'>
		            <Button as={ NavLink } to='login' name='login'>Log in</Button>
		        </Menu.Item>
		        <Menu.Item>
		            <Button as={ NavLink } to='signup' name='signup' primary>Sign Up</Button>
		        </Menu.Item>
		    </Menu.Menu>

	    }

    	return(
			<Menu fixed='top' size='large'>
			    <Container>
				    <Menu.Item exact as={ NavLink } to='/' name='home' >Home</Menu.Item>
	    		    <Menu.Item as={ NavLink } to='/currencies' name='currencies' >Currencies</Menu.Item>
					<Menu.Item as={ NavLink } to='/corporations' name='corporation'>Corporations</Menu.Item>
					<Menu.Item as={ NavLink } to='/investments' name='investments'>Investments</Menu.Item>
				    {accountButtons}  
			    </Container>
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
    logoutAccount: bindActionCreators(logoutAccount, dispatch) 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FixedMenuBar);