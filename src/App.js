import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CurrenciesPage from './containers/currencies/CurrenciesPage';
import LoginForm from './containers/session/LoginForm'
import AccountSignupForm from './containers/accounts/AccountSignupForm'
import AccountCorporationShow from './containers/accounts/corporation/AccountCorporationShow'
import AccountInvestorShow from './containers/accounts/investor/AccountInvestorShow'
import * as currencyActions from './actions/currencyActions';
import InvestmentsPage from './containers/investments/InvestmentsPage'

import { Button, Icon, Label } from 'semantic-ui-react';

class App extends Component {

    componentWillMount(){
        if(this.props.currencies.all.length === 0){
            this.props.currencyActions.fetchCurrencies()
        }
    }
  
    componentDidMount(){
        setInterval(() => {
            this.props.currencyActions.fetchCurrencies(); 
        }, 600000);
    }

  render() {
    const { loggedIn, account } = this.props
    
    let navLinks = null;
    if(account.accountType === "investor"){
        navLinks = <div className="navLinks">
            <NavLink style={{ marginRight: '10px' }} activeStyle={{ background: 'darkblue' }} exact to={`/account/investors/${account.info.id}`}>Account: {account.info.first_name}</NavLink>
            <NavLink style={{ marginRight: '10px' }} activeStyle={{ background: 'darkblue' }} exact to="/account/logout">Logout</NavLink>
        </div> 
    }else if(account.accountType === "corporation"){
        navLinks = <div className="navLinks">
            <NavLink style={{ marginRight: '10px' }} activeStyle={{ background: 'darkblue' }} exact to={`/account/corporations/${account.info.id}`}>Account: {account.info.name}</NavLink>
            <NavLink style={{ marginRight: '10px' }} activeStyle={{ background: 'darkblue' }} exact to="/account/logout">Logout</NavLink>
        </div>
    }else{
        navLinks = <div className="navLinks">
            <NavLink style={{ marginRight: '10px' }} activeStyle={{ background: 'darkblue' }} exact to="/login">Login</NavLink> 
            <NavLink style={{ marginRight: '10px' }} activeStyle={{ background: 'darkblue' }} exact to="/signup">Signup</NavLink>
        </div>
    }
     
    
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Router>
          <div>
            <div style={{ borderBottom: '2px solid black', paddingBottom: '10px', marginBottom: '12px' }}>
              <NavLink style={{ marginRight: '10px' }} to="/currencies">See All The Currencies!</NavLink>
              {navLinks}
            </div>
            <Switch>
              <Route exact path="/" render={() => <h3>Welcome to currencyUP</h3>} />
              <Route exact path="/currencies" component={CurrenciesPage} />
              <Route exact path="/login" component={LoginForm} />
              <Route exact path="/signup" component={AccountSignupForm} /> 
              <Route path="/account/corporations/:corporationId" component={AccountCorporationShow}/>
              <Route path="/account/investors/:investorId" component={AccountInvestorShow}/>
              <Route path="/investments" component={InvestmentsPage} />
            </Switch>
          </div>  
        </Router>  
      </div>
    );
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
    currencyActions: bindActionCreators(currencyActions, dispatch)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
