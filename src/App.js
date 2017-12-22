import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, NavLink, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CurrenciesPage from './containers/currencies/CurrenciesPage';
import LoginForm from './containers/session/LoginForm'
import SignupForm from './containers/account/SignupForm'
import AccountShow from './containers/account/AccountShow'

class App extends Component {
  render() {
    const { loggedIn } = this.props
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
              <NavLink style={{ marginRight: '10px' }} activeStyle={{ background: 'darkblue' }} exact to="/login">Login</NavLink> 
              <NavLink style={{ marginRight: '10px' }} activeStyle={{ background: 'darkblue' }} exact to="/signup">Signup</NavLink> 
            </div>
            <Route exact path="/" render={() => <h3>Welcome to currencyUP</h3>} />
            <Route exact path="/currencies" component={CurrenciesPage} />
            <Route exact path="/login" component={LoginForm} />
            <Route exact path="/signup" component={SignupForm} /> 
            <Route exact path="/account" component={AccountShow}/> 
          </div>  
        </Router>  
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { loggedIn: state.session.loggedIn }
}


export default connect(mapStateToProps)(App);
