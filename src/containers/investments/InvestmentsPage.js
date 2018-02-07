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
        let investmentsSegment = "";
		if(investments.loading || corporations.loading){
			
			investmentsSegment = <Segment>
			    <h3>Investments Page</h3>
                <h3>Loading Investments</h3>
			</Segment>

		}else if(investments.all.length > 0 && corporations.all.length > 0){
			
			investmentsSegment = <Segment style={{ margin: '5em 0em'}}>
			    <Header as="h1" textAlign="center" >All Investments</Header>
			    {account.accountType === 'investor' ? <h3>You have {account.info.currency_investors[0].total_amount.toFixed(4)} to invest</h3> : ""}
                <InvestmentsQuickView/>
            </Segment>
			
		}else{
			
			investmentsSegment = <Segment>
			    <h3>Investments Page</h3>
			    fill up this area
			</Segment>
			
		}
		return(
			<div className="DottedBox" id="#investments-info">
			    {investmentsSegment}
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