import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
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
import AccountInvestorInfoCard from '../../../components/account/AccountInvestorInfoCard';
import AccountInvestorEditForm from './AccountInvestorEditForm';
import InvestorFundsCard from '../../../components/InvestorFundsCard';


class AccountInvestorTopSegment extends Component{
  constructor(props){
    super(props);
  }

  render(){
    const { account, currencies } = this.props;

    return(
        <Segment style={{ padding: '0em' }} vertical>
            <Grid celled='internally' divided stackable>
                <span id="investor-info"></span>
                <Grid.Row textAlign='center'>
                    <Grid.Column  width={6} style={{ paddingBottom: '1em', paddingTop: '5em' }}>
                        <Header as='h3' style={{ fontSize: '2em' }}>Account Info</Header>
                        <Segment style={{ background: "#dce2dc" }}>
                            <Switch> 
                                <Route exact path="/account/investors/:investorId" 
                                    render={() => <AccountInvestorInfoCard accountInfo={account} />} />
                                <Route exact path="/account/investors/:investorId/Edit" component={AccountInvestorEditForm}/>
                            </Switch>
                        </Segment>
                        <Segment>
                            <Link to={`/account/investors/${account.info.id}#investor-info`}><Button icon style={{ margin: '1em 2px'}}><Icon name='info circle'/></Button></Link>
                            <Link to={`/account/investors/${account.info.id}/Edit#investor-info`}><Button style={{ margin: '1em 2px'}}><Icon name='edit'/>Edit Account</Button></Link>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column textAlign='center' width={9} style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                        <Header as='h3' style={{ fontSize: '2em' }}>Funds</Header>
                        <InvestorFundsCard currenciesData={currencies} currencyInvestorsData={account.info.currency_investors}/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
    )
  }
}

const mapStateToProps = (state) => {
    return { 
        account: state.account,
        currencies: state.currencies
    }
}

export default connect(mapStateToProps)(AccountInvestorTopSegment);