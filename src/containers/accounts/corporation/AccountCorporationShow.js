import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import AccountCorporationInfo from '../../../components/account/AccountCorporationInfo';
import CorporationInvestorsList from '../../../components/investors/CorporationInvestorsList';
import CorporationFunds from '../../../components/corporations/CorporationFunds';
import CorporationInvestmentsList from '../../../components/investments/CorporationInvestmentsList';
import CorporationTransactionsList from '../../../components/transactions/CorporationTransactionsList';

import AccountCorporationEditForm from './AccountCorporationEditForm';
import GenerateInvestmentForm from '../../corporations/GenerateInvestmentForm'


class AccountCorporationShow extends Component{
    constructor(props){
        super(props);

        this.state = {};
    }

    render(){
        const { account, session } = this.props;
        const { id, investors, corporation_investments, transactions, currency_corporations } = this.props.account.info;

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
        }else if(account.accountType === "corporation"){
            return(
                <div>
                    <Switch> 
                        <Route path={`${this.props.match.url}/Edit`} component={AccountCorporationEditForm}/>
                        <Route exact path={`${this.props.match.url}/corporationInvestments`} component={GenerateInvestmentForm} /> 
                    </Switch>
                    <div className="DottedBox">
                        <p>Hello from AccountShow smart Container for corporations</p>
                        
                        <AccountCorporationInfo accountInfo={account}/>
                        <CorporationInvestorsList investorsInfo={investors}/>
                        <CorporationInvestmentsList investmentsInfo={corporation_investments}/>
                        <CorporationTransactionsList currenciesData={this.props.currencies} transactionsData={transactions}/>
                        <CorporationFunds currenciesInfo={currency_corporations}/>
                        
                        <button><Link to={ { pathname: `${id}/Edit` } }>Edit Account</Link></button>
                        <button><Link to={`${id}/corporationInvestments`}>Generate Investment</Link></button>
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

export default connect(mapStateToProps)(AccountCorporationShow)