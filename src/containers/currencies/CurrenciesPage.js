import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import * as currencyActions from '../../actions/currencyActions';
import CurrenciesList from '../../components/currencies/CurrenciesList'

class CurrenciesPage extends Component {
    constructor(props){
        super(props);

        this.state = {}
    }

    render(){
        return(
           <h1>hello from CurrenciesPage smart container</h1> 
        )
    }
}

export default CurrenciesPage;