import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import CorporationAccountInfo from '../../components/account/CorporationAccountInfo';
import InvestorAccountInfo from '../../components/account/InvestorAccountInfo';
import InvestorsList from '../../components/investors/InvestorsList';
import CorporationFunds from '../../components/corporations/CorporationFunds';
import InvestmentsList from '../../components/investments/InvestmentsList';

import AccountEditForm from './AccountEditForm';

class AccountShow extends Component{
    constructor(){
        super();

        this.state = {
            infoComponenet: null,
            investorsList: null,
            investorsList: null,
            funds: null,
        }
    }
    
    componentWillMount(){
        // dispatch some async action data for  user to populate the state
        const { account } = this.props;
        if (account.accountType === "corporation"){ 
            this.setState({ infoComponenet: <CorporationAccountInfo accountInfo={account}/> });
            this.setState({ investorsList: <InvestorsList investorsInfo={account.info.investors}/> });
            this.setState({ investmentsList: <InvestmentsList investmentsInfo={account.info.corporation_investments}/> });
            this.setState({ funds: <CorporationFunds currenciesInfo={account.info.currency_corporations}/> });
            
        }else if(account.accountType === "investor"){
            this.setState({ infoComponenet: <InvestorAccountInfo accountInfo={account}/> })
        }
    }

    render(){
        const { account, session } = this.props;
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
        }
        else if(account.accountType === "corporation" || "investor"){
            return(
                <div>
                  <Route path={`${this.props.match.url}/:accountId/Edit`} component={AccountEditForm}/>
                 <div>
                    <p>Hello from AccountShow smart Container</p>
                    <Link to={ { pathname:`${this.props.match.url}/${account.info.id}/Edit` } }>Edit Account</Link>
                    {this.state.infoComponenet}
                    {this.state.investorsList}
                    {this.state.investmentsList}
                    {this.state.funds}
                 </div>
                    
                 {/* 
                 <div> <InvestmentsList investments={}/> </div>
                 <div> <TransactionsList transactions={}/> </div>
                 <div> <InvestmentsGeneratorButton> </div>
                 <swith>
                    <Route path={`${this.props.match.url}/investments`} component={InvestmentsPage} />
                    <Route path={`${this.props.match.url}/funds`} component={FundsPage} />
                 </switch>   */}
               </div>   
            )
        }
    }
}

const mapStateToProps = (state) => {
    return { 
        account: state.account,
        session: state.session
    }
}

export default connect(mapStateToProps)(AccountShow)