import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import InvestmentsList from '../../components/investments/InvestmentsList';
import * as investmentActions from '../../actions/investmentActions';
import * as corporationActions from '../../actions/corporationActions';

class InvestmentsPage extends Component{
	constructor(props){
		super(props);
		this.state = {}
	}

	componentDidMount(){
		if(this.props.investments.all.length === 0 || this.props.corporations.all.length === 0){
			this.props.investmentActions.fetchInvestments();
			this.props.corporationActions.fetchCorporations();
		}
	}

	render(){
		const { investments, corporations, account }= this.props;

		if(investments.loading || corporations.loading){
			return(
				<div className="DottedBox">
				    <h3>Investments Page</h3>
	                <h3>Loading Investments</h3>
				</div>
			)
		}else if(investments.all.length > 0 && corporations.all.length > 0){
			let currentInvestments = null;
			if(account.accountType === "investor"){
	            currentInvestments = investments.all.filter(i => i.region === account.info.region)
			}else{
				currentInvestments = investments.all
			}

			return(
				<div className="DottedBox">
				    <h3>Investments Page</h3>
	                <InvestmentsList investmentsData={currentInvestments} corporationsData={corporations.all}/>
				</div>
			)
		}else{
			return(
				<div className="DottedBox">
				    <h3>Investments Page</h3>
				</div>
			)
		}
	}
}

const mapStateToProps = (state) => {
    return{
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