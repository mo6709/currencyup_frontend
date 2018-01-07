import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import CorporationAccountInfo from '../../components/account/CorporationAccountInfo';
import InvestorAccountInfo from '../../components/account/InvestorAccountInfo';
import InvestorsList from '../../components/investors/InvestorsList';
import CorporationFunds from '../../components/corporations/CorporationFunds';
import InvestmentsList from '../../components/investments/InvestmentsList';
import TransactionsList from '../../components/transactions/TransactionsList';

import AccountEditForm from './AccountEditForm';
import GenerateInvestmentForm from '../corporations/GenerateInvestmentForm'


class AccountShow extends Component{
    constructor(props){
        super(props);

        this.state = {};
    }

    render(){
        const { account, session } = this.props;
        const { investors, corporation_investments, transactions, currency_corporations } = this.props.account.info;

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
                        <Route path={`${this.props.match.url}/:accountId/Edit`} component={AccountEditForm}/>
                        <Route exact path={`${this.props.match.url}/corporationInvestments`} component={GenerateInvestmentForm} /> 
                    </Switch>
                    <div className="DottedBox">
                        <p>Hello from AccountShow smart Container for corporations</p>
                        
                        <CorporationAccountInfo accountInfo={account}/>
                        <InvestorsList investorsInfo={investors}/>
                        <InvestmentsList investmentsInfo={corporation_investments}/>
                        <TransactionsList currencies={this.props.currencies} transactionsInfo={transactions}/>
                        <CorporationFunds currenciesInfo={currency_corporations}/>
                        
                        <button><Link to={ { pathname:`${this.props.match.url}/${account.info.id}/Edit` } }>Edit Account</Link></button>
                        <button><Link to={`${this.props.match.url}/corporationInvestments`}>Generate Investment</Link></button>
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

export default connect(mapStateToProps)(AccountShow)