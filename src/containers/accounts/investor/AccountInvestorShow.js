import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import AccountInvestorInfo from '../../../components/account/AccountInvestorInfo';
import AccountInvestorEditForm from './AccountInvestorEditForm';
import InvestorInvestmentsList from '../../../components/investments/InvestorInvestmentsList';
import InvestorTransactionsList from '../../../components/transactions/InvestorTransactionsList';
// import CorporationFunds from '../../components/corporations/CorporationFunds';
// import InvestmentsList from '../../components/investments/InvestmentsList';


// import GenerateInvestmentForm from '../corporations/GenerateInvestmentForm'


class AccountInvestorShow extends Component{
    constructor(props){
        super(props);

        this.state = {};
    }

    render(){
        const { account, session, currencies } = this.props;

        if(account.loading){
            return(
                <div>
                    <h3>Loading...</h3>
                </div>
            )
        }else if(!session.loggedIn){
            return(
                <div>
                    <h3>You must be logged in</h3>
                    <Link to="/login">Login Here</Link>
                </div>
            )
        }else if(account.accountType === "investor"){
            return(
                <div>
                   { <Switch> 
	                  <Route path={`${this.props.match.url}/Edit`} component={AccountInvestorEditForm}/>
	               </Switch>}
                    <div className="DottedBox">
                        <p>Hello from AccountInvestorShow smart Container</p>
                        <AccountInvestorInfo accountInfo={account}/>
                        <InvestorInvestmentsList currenciesData={currencies} transactionsData={account.info.transactions}/>
                        <InvestorTransactionsList currenciesData={currencies} transactionsData={account.info.transactions}/>

                        <button><Link to={ { pathname:`${account.info.id}/Edit` } }>Edit Account</Link></button>
                        
                        {/*
                        
                        
                        <CorporationFunds currenciesInfo={currency_corporations}/>
                        
                        <button><Link to={`${this.props.match.url}/corporationInvestments`}>Generate Investment</Link></button>*/}
                    </div>
                        
                     {/* 
                     <div> <InvestmentsGeneratorButton> </div>
                     <swith>
                        <Route path={`${this.props.match.url}/investments`} component={InvestmentsPage} />
                        <Route path={`${this.props.match.url}/funds`} component={FundsPage} />
                     </switch>   */}
               </div>   
            )
        }else if(account.accountType === "investor"){
            return(
                <div>
                    <p>Hello from AccountShow smart Container for investor</p>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return { 
        account: state.account,
        session: state.session,
        currencies: state.currencies
    }
}

export default connect(mapStateToProps)(AccountInvestorShow)