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


class FixedMenuBar extends Component {
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

	        accountButtons = <Menu.Menu position='right'>
		        <Menu.Item className='item'>
                    <Button as={Link} name='account' to={`${this.props.match.url}account/investors/${account.info.id}#investor-info`}>
                       {account.info.first_name}
                    </Button>
		        </Menu.Item>
		        <Menu.Item>
                    <Button as={Link} primary name='logout' style={{ marginLeft: '0.5em' }} onClick={this.logOut} to={this.props.match.url}>
                        Logout
                    </Button>
		        </Menu.Item>
		    </Menu.Menu>

	    }else if(loggedIn && loggedIn && account.accountType === "corporation"){

	        accountButtons = <Menu.Menu position='right'>
		        <Menu.Item className='item'>
                    <Button as={Link} name='account' to={`${this.props.match.url}account/corporations/${account.info.id}#corporation-info`}>
                        {account.info.name}
                    </Button>
		        </Menu.Item>
		        <Menu.Item>
                    <Button as={Link} primary name='logout' style={{ marginLeft: '0.5em' }} onClick={this.logOut} to={this.props.match.url}>
                        Logout
                    </Button>
		        </Menu.Item>
		    </Menu.Menu>

	    }else{

	        accountButtons = <Menu.Menu position='right'>
		        <Menu.Item className='item'>
                    <Button as={Link} name='login' to='login#login-sec'>
                        Log in
                    </Button>
		        </Menu.Item>
		        <Menu.Item>
                    <Button as={Link} primary name='signup' to='signup#signup-sec'>
                        Sign Up
                    </Button>
		        </Menu.Item>
		    </Menu.Menu>

	    }

    	return(
			<Menu fixed='top' size='large'>
			    <Container>
					 <Menu.Item as={Link} name='home' to='/#home-div' exact> 
	                    Home
	                </Menu.Item>
	                <Menu.Item as={Link} name='currencies' to='/currencies#currencies-div'> 
	                    Currencies 
	                </Menu.Item>
	                <Menu.Item as={Link} name='corporations' to='/corporations#corporations-div'> 
	                    Corporations
	                </Menu.Item>
	                <Menu.Item as={Link} name='investments' to='/investments#investments-info'> 
	                    Investments
	                </Menu.Item>

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
    logout: bindActionCreators(logout, dispatch) 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FixedMenuBar);