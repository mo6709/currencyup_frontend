import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import * as currencyActions from '../../actions/currencyActions';
import CurrenciesList from '../../components/currencies/CurrenciesList';
import CurrenciesTable from './CurrenciesTable';
import { bindActionCreators } from 'redux';
import { Segment, Header } from 'semantic-ui-react';

class CurrenciesPage extends Component {
    constructor(props){
        super(props);

        this.state = {}
    }

    componentDidMount() {
        if(this.props.currencies.all.length === 0){
            this.props.currencyActions.fetchCurrencies()
        }
    }

    render(){
        return(
            <div id="currencies-div" className="DottedBox">
                <Segment style={{ margin: '5em 0em'}}>
                    <Header as="h1" textAlign="center">All Currencies</Header>
                    <Segment loading={this.props.currencies.loading}>
                        <CurrenciesTable/> 
                    </Segment>
                </Segment>
           </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currencies: state.currencies
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        currencyActions: bindActionCreators(currencyActions, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrenciesPage);