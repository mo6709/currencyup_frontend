import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import CorporationAccountInfo from '../../components/account/CorporationAccountInfo';
import InvestorAccountInfo from '../../components/account/InvestorAccountInfo';
import InvestorsList from '../../components/investors/InvestorsList'
import AccountEditForm from './AccountEditForm';

class AccountShow extends Component{
    constructor(){
        super();

        this.state = {
            infoComponenet: null,
            investorsList: null,
        }
    }
    
    componentWillMount(){
        const { account } = this.props;
        if (account.accountType === "corporation"){ 
            this.setState({ infoComponenet: <CorporationAccountInfo accountInfo={account}/> })
            this.setState({ investorsList: <InvestorsList investorsInfo={account.info.investors}/> })
        }else if(account.accountType === "investor"){
            this.setState({ infoComponenet: <InvestorAccountInfo accountInfo={account}/> })
        }
    }

    render(){
        const { account } = this.props;
        return(
            <div>
             <Switch>
              <Route path={`${this.props.match.url}/${account.info.id}/Edit`} component={AccountEditForm}/>
             </Switch> 
             <div>
                <p>Hello from AccountShow smart Container</p>
                <Link to={`${this.props.match.url}/${account.info.id}/Edit`}>Edit Account</Link>
                {this.state.infoComponenet}
                {this.state.investorsList}
             </div>
                
             {/* 
             <div> <FundsList funds={} /> </div>
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

const mapStateToProps = (state) => {
    return { account: state.account }
}

export default connect(mapStateToProps)(AccountShow)