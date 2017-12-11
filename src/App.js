import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, NavLink, Route } from 'react-router-dom';
import CurrenciesPage from './containers/currencies/CurrenciesPage';

class App extends Component {
  render() {
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
              <NavLink style={{ marginRight: '10px' }} to="/">See All The Currencies!</NavLink>
              <NavLink style={{ marginRight: '10px' }} activeStyle={{ background: 'darkblue' }} exact to="/login">Login</NavLink> 
            </div>
            <Route exact path="/" render={() => <h3>Welcome to currencyUP</h3>} />
            <Route exact path="/currencies" component={CurrenciesPage} />
          </div>  
        </Router>  
      </div>
    );
  }
}

export default App;
