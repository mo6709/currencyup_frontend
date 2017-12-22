import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import CorporationInfo from '../../components/account/CorporationInfo';
import InvestorInfo from '../../components/account/InvestorInfo';
import AccountEdit from './AccountEdit'

class AccountShow extends Component{
    constructor(){
      super();

      this.state = {}
    }

    render(){
        
        // const { account } = this.props;
        
        // let infoComponenet = null;
        // if (account.accountType === "corporation"){ 
        //     infoComponenet = <CorporationInfo accountInfo={account}/>;
        // }else if(account.accountType === "investor"){
        //     infoComponenet = <InvestorInfo accountInfo={account}/>;
        // }

        return(
            <div>
             <Route path={`${this.props.match.url}/new`} component={AccountEdit}/>
             <div>
                <p>Hello from AccountShow samrt Container</p>
                <Link to={`${this.props.match.url}/new`}>New Account</Link>
             </div>
                
             {/* <div> <InvestorsList investors={}/> </div>
             <div> <FundsLists funds={} /> </div>
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