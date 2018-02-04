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

import InvestorInvestmentsTable from '../../../components/investments/InvestorInvestmentsTable';
import InvestorTransactionsList from '../../../components/transactions/InvestorTransactionsList';
import InvestmentsPage from '../../investments/InvestmentsPage';
import AccountInvestorTopSegment from './AccountInvestorTopSegment';
import AccountInvestorInvestmentsTopSegment from './AccountInvestorInvestmentsTopSegment';


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
                <div className="accountInvestorShow">
                    <Switch>
                        <Route path={`${this.props.match.url}`} component={AccountInvestorTopSegment}/>
                        <Route path={`${this.props.match.url}/Edit`} component={AccountInvestorTopSegment}/>
                        <Route path={`${this.props.match.url}/investments`} component={AccountInvestorInvestmentsTopSegment} />
                    </Switch>

                  <Segment  style={{ padding: '8em 0em' }} vertical>
                    <Grid container stackable verticalAlign='middle'>
                      <Grid.Row>
                        <Grid.Column textAlign='center' width={10}> 
                          <Header as='h3' style={{ fontSize: '2em' }}>Your Active Investments</Header>
                        </Grid.Column>
                        <Grid.Column textAlign='right' width={4}>
                          <Button><Icon name='angle double down' /><Link to={{ pathname: `${this.props.match.url}/investments` }}>Start to Invest</Link></Button>
                        </Grid.Column>  
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column textAlign='center'>
                        <InvestorInvestmentsTable currenciesData={currencies} transactionsData={account.info.transactions}/>
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
                        <InvestorTransactionsList currenciesData={currencies} transactionsData={account.info.transactions}/>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Segment>   
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

export default connect(mapStateToProps)(AccountInvestorShow);

