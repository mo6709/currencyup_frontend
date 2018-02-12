import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as investmentActions from '../../actions/investmentActions';
import * as corporationActions from '../../actions/corporationActions';
import InvestmentsQuickView from './InvestmentsQuickView';
import { Segment, Header } from 'semantic-ui-react';

class InvestmentsPage extends Component{
	constructor(props){
		super(props);
	}

	componentDidMount(){
		if(this.props.investments.all.length ===  0 || this.props.corporations.all.length === 0){
			this.props.investmentActions.fetchInvestments();
			this.props.corporationActions.fetchCorporations();
		}
	}

	render(){
		const { investments, corporations, account, session } = this.props;
		const currencyInvestor = account.info.currency_investors;
		const firstCurrencyInvestor = "";
		if( currencyInvestor[0] ){
			firstCurrencyInvestor = <h3>You have {currencyInvestor[0].total_amount.toFixed(4)} to invest</h3>;
		}
		return(
			<div className="DottedBox" id="investments-info">
			    <Segment style={{ margin: '5em 0em'}}>
				    <Header as="h1" textAlign="center" >All Investments</Header>
				    {firstCurrencyInvestor} 
	                <Segment loading={investments.loading || corporations.loading}>
	                    <InvestmentsQuickView/>
	                </Segment>
	            </Segment>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
    return{
    	session: state.session,
    	account: state.account,
    	investments: state.investments,
    	corporations: state.corporations
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    	investmentActions: bindActionCreators(investmentActions, dispatch),
    	corporationActions: bindActionCreators(corporationActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvestmentsPage);