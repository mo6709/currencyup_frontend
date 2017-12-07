import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import * as currencyActions from '../../actions/currencyActions';
import CurrenciesList from '../../components/currencies/CurrenciesList';
import { bindActionCreators } from 'redux';

class CurrenciesPage extends Component {
    constructor(props){
        super(props);

        this.state = {}
    }

    componentDidMount() {
        if(this.props.currencies.length === 0){
            this.props.currencyActions.fetchCurrencies()
        }
    }

    render(){
        return(
           <div>
             <h1>hello from CurrenciesPage smart container</h1>
             <CurrenciesList CurrenciesData={this.props.currencies}/> 
           </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currencies: state.currencies.all
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        currencyActions: bindActionCreators(currencyActions, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrenciesPage);