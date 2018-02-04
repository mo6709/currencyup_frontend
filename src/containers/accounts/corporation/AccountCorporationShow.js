import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Visibility,
} from 'semantic-ui-react';

import CorporationInvestorsTable from '../../../components/investors/CorporationInvestorsTable';
import CorporationInvestmentsTable from '../../../components/investments/CorporationInvestmentsTable';
import CorporationTransactionsTable from '../../../components/transactions/CorporationTransactionsTable';
import AccountCorporationInfoTopSegment from './AccountCorporationInfoTopSegment';
import AccountCorporationTopSegment from './AccountCorporationTopSegment';


class AccountCorporationShow extends Component{
    constructor(props){
        super(props);

        this.state = {};
    }

    render(){
        const { account, session } = this.props;
        const { url } = this.props.match;
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
                    <div className="accountInvestorShow">
                    <Switch> 
                        <Route exact path={`${url}`} component={AccountCorporationInfoTopSegment} />
                        <Route exact path={`${url}/Edit`} component={AccountCorporationTopSegment}/>
                        <Route exact path={`${url}/corporationInvestments`} component={AccountCorporationTopSegment} /> 
                    </Switch>

                      <Segment style={{ padding: '3em 0em' }} vertical>
                        <Grid  container stackable divided >
                          <Grid.Row>
                            <Grid.Column width={4} >
                               <Header as='h3' style={{ textAlign: 'center', padding: '0em 1em', fontSize: '2em' }}>Investors</Header> 
                               <CorporationInvestorsTable investorsInfo={investors}/> 
                            </Grid.Column>
                            <Grid.Column width={10} >
                                <Header as='h3' style={{ textAlign: 'center', padding: '0em 1em', fontSize: '2em' }}>Active Investments</Header>
                                <CorporationInvestmentsTable investmentsData={corporation_investments} currenciesData={this.props.currencies}/>
                            </Grid.Column>
                          </Grid.Row>
                        </Grid>
                      </Segment>
                      
                      <Segment  style={{ padding: '8em 0em' }} vertical>
                        <Grid container stackable verticalAlign='middle'>
                          <Grid.Row>
                            <Grid.Column width={14}> 
                                <Header as='h3' style={{ fontSize: '2em' }}>Your Transactions</Header>
                            </Grid.Column> 
                          </Grid.Row>
                          <Grid.Row>
                            <Grid.Column textAlign='center'>
                                <CorporationTransactionsTable transactionsData={transactions} currenciesData={this.props.currencies}/>
                            </Grid.Column>
                          </Grid.Row>
                        </Grid>
                      </Segment>   
                    </div> 
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

export default connect(mapStateToProps)(AccountCorporationShow);