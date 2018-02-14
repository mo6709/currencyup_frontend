import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Switch, Route } from 'react-router-dom';
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
import AccountCorporationEditForm from './AccountCorporationEditForm';
import GenerateInvestmentForm from './GenerateInvestmentForm';
import CorporationFundsCard from '../../../components/CorporationFundsCard';


class AccountCorporationInfoTopSegment extends Component{
  constructor(props){
    super(props);
  }

  render(){
    const { account, currencies } = this.props;
        const { url } = this.props.match;
        const { id, investors, corporation_investments, transactions, currency_corporations } = this.props.account.info;

    return(
        <Segment style={{ padding: '0em' }} vertical>
            <Grid celled='internally' divided stackable horizentalAlign='middle'>
                <Grid.Row textAlign='center'>
                    <Grid.Column inverted horizentalAlign='middle'  width={9} style={{ paddingBottom: '1em', paddingTop: '5em' }}>
                        <Header as='h3' style={{ fontSize: '2em' }}>Corporation Info</Header>
                        <Switch>
                            <Route exact path="/account/corporations/:corporationId/Edit" component={AccountCorporationEditForm}/>
                            <Route exact path="/account/corporations/:corporationId/corporationInvestments" component={GenerateInvestmentForm} />
                        </Switch>
                        
                        <Link to={`/account/corporations/${account.info.id}#corporation-info`}><Button icon style={{ margin: '1em 2px'}}><Icon name='info circle'/></Button></Link>
                        <Link to={`/account/corporations/${account.info.id}/Edit#corporation-info`}><Button style={{ margin: '1em 2px'}}><Icon name='edit'/>Edit Account</Button></Link>
                        <Link to={`/account/corporations/${account.info.id}/corporationInvestments#corporation-info`}><Button><Icon name='cogs'/>Generate Investment</Button></Link>
                        
                    </Grid.Column>
                    <Grid.Column horizentalAlign='middle' textAlign='center' width={6} style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                        <Header as='h3' style={{ fontSize: '2em' }}>Funds</Header>
                        <CorporationFundsCard currencyCorporationsData={currency_corporations} currenciesData={currencies}/>
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

export default connect(mapStateToProps)(AccountCorporationInfoTopSegment);