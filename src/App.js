import React, { Component } from 'react';
import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
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

import CurrenciesPage from './containers/currencies/CurrenciesPage';
import LoginForm from './containers/session/LoginForm';
import AccountSignupForm from './containers/accounts/AccountSignupForm';
import AccountCorporationShow from './containers/accounts/corporation/AccountCorporationShow';
import AccountInvestorShow from './containers/accounts/investor/AccountInvestorShow';
import * as currencyActions from './actions/currencyActions';
import InvestmentsPage from './containers/investments/InvestmentsPage';
import MenuBar from './containers/MenuBar';
import FixedMenuBar from './containers/FixedMenuBar';
import HomepageLayout from './containers/HomepageLayout';

class App extends Component {
    constructor(props){
        super(props);

        this.state = {};
    }

    componentWillMount(){
        if(this.props.currencies.all.length === 0){
            this.props.currencyActions.fetchCurrencies()
        }
    }
  
    componentDidMount(){
        setInterval(() => {
            this.props.currencyActions.fetchCurrencies(); 
        }, 600000);
    }

    hideFixedMenu = () => this.setState({ visible: false })
    showFixedMenu = () => this.setState({ visible: true })

    render() {
        const { visible } = this.state

        return (
            <div className="App"> 
                <Router>
                    <div>
                        { visible ? <Switch><Route path='/' component={FixedMenuBar} /></Switch> : null }

                        <Visibility
                        onBottomPassed={this.showFixedMenu}
                        onBottomVisible={this.hideFixedMenu}
                        once={false}
                        >
                            <Segment
                            inverted
                            textAlign='center'
                            style={{ minHeight: 700, padding: '1em 0em' }}
                            vertical
                            >
                                <Container>
                                    <Switch>
                                        <Route path='/' component={MenuBar} />
                                    </Switch>
                                </Container>
                                <Container text>
                                    <Header
                                    as='h1'
                                    content='currencyUP'
                                    inverted
                                    style={{ fontSize: '4em', fontWeight: 'normal', marginBottom: 0, marginTop: '3em' }}
                                    />
                                    <Header
                                    as='h2'
                                    content='Currency exchange marketplace for Corporation and Invetors.'
                                    inverted
                                    style={{ fontSize: '1.7em', fontWeight: 'normal' }}
                                    />
                                    <Button primary size='huge'>
                                        Get Started
                                        <Icon name='right arrow' />
                                    </Button>
                                </Container>
                            </Segment>
                        </Visibility>

                        <Switch> 
                            <Route exact path="/" component={HomepageLayout} />
                            <Route exact path="/login" component={LoginForm} />
                            <Route exact path="/signup" component={AccountSignupForm} /> 
                            <Route exact path="/currencies" component={CurrenciesPage} />
                            <Route exact path="/investments" component={InvestmentsPage} />
                            <Route path="/account/corporations/:corporationId" component={AccountCorporationShow}/>
                            <Route path="/account/investors/:investorId" component={AccountInvestorShow}/>
                        </Switch>

                        <Segment inverted vertical style={{ padding: '5em 0em' }}>
                          <Container>
                            <Grid divided inverted stackable>
                              <Grid.Row>
                                <Grid.Column width={3}>
                                  <Header inverted as='h4' content='About' />
                                  <List link inverted>
                                    <List.Item as='a'>Sitemap</List.Item>
                                    <List.Item as='a'>Contact Us</List.Item>
                                    <List.Item as='a'>Religious Ceremonies</List.Item>
                                    <List.Item as='a'>Gazebo Plans</List.Item>
                                  </List>
                                </Grid.Column>
                                <Grid.Column width={3}>
                                  <Header inverted as='h4' content='Services' />
                                  <List link inverted>
                                    <List.Item as='a'>Banana Pre-Order</List.Item>
                                    <List.Item as='a'>DNA FAQ</List.Item>
                                    <List.Item as='a'>How To Access</List.Item>
                                    <List.Item as='a'>Favorite X-Men</List.Item>
                                  </List>
                                </Grid.Column>
                                <Grid.Column width={7}>
                                  <Header as='h4' inverted>Footer Header</Header>
                                  <p>Extra space for a call to action inside the footer that could help re-engage users.</p>
                                </Grid.Column>
                              </Grid.Row>
                            </Grid>
                          </Container>
                        </Segment>
                    </div>
                </Router>  
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        account: state.account,
        loggedIn: state.session.loggedIn, 
        currencies: state.currencies
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        currencyActions: bindActionCreators(currencyActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
