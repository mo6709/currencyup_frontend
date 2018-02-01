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

import AccountCorporationInfoCard from '../../../components/account/AccountCorporationInfoCard';
import CorporationInvestorsTable from '../../../components/investors/CorporationInvestorsTable';
import CorporationFundsCard from '../../../components/CorporationFundsCard';
import CorporationInvestmentsTable from '../../../components/investments/CorporationInvestmentsTable';
import CorporationTransactionsTable from '../../../components/transactions/CorporationTransactionsTable';

import AccountCorporationEditForm from './AccountCorporationEditForm';
import GenerateInvestmentForm from './GenerateInvestmentForm'


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
                    <div className="accountInvestorShow">
                      <Segment style={{ padding: '0em' }} vertical>
                        <Grid celled='internally' divided stackable horizentalAlign='middle'>
                          <Grid.Row textAlign='center'>
                            <Grid.Column inverted horizentalAlign='middle'  width={6} style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                              <Header as='h3' style={{ fontSize: '2em' }}>Corporation Info</Header>
                                <Switch> 
                                    <Route exact path={`${this.props.match.url}`} render={() => <AccountCorporationInfoCard accountInfo={account}/>} />
                                    <Route exact path={`${this.props.match.url}/Edit`} component={AccountCorporationEditForm}/>
                                    <Route exact path={`${this.props.match.url}/corporationInvestments`} component={GenerateInvestmentForm} /> 
                                </Switch>
                                <Link to={`${this.props.match.url}`}><Button icon style={{ margin: '1em 2px'}}><Icon name='info circle'/></Button></Link>
                                <Link to={`${this.props.match.url}/Edit`}><Button style={{ margin: '1em 2px'}}><Icon name='edit'/>Edit Account</Button></Link>
                                <Link to={`${this.props.match.url}/corporationInvestments`}><Button><Icon name='cogs'/>Generate Investment</Button></Link>
                            </Grid.Column>
                            <Grid.Column horizentalAlign='middle' textAlign='center' width={9} style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                              <Header as='h3' style={{ fontSize: '2em' }}>Funds</Header>
                              <CorporationFundsCard currencyCorporationsData={currency_corporations} currenciesData={this.props.currencies}/>
                            </Grid.Column>
                          </Grid.Row>
                        </Grid>
                      </Segment>

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