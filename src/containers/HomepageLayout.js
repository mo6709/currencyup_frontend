import React, { Component } from 'react';
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
import CurrenciesQuickView from './currencies/CurrenciesQuickView';
import InvestmentsQuickView from './investments/InvestmentsQuickView';
import CorporationsQuickView from './corporations/CorporationsQuickView';

class HomepageLayout extends Component {
    constructor(props){
      super(props);
    }

  render() {
    return (
      <div >

          <Segment style={{ padding: '5em' }} vertical>
            <span id="home-div"></span>
            <Grid celled='internally' columns='equal' stackable>
              <Grid.Row textAlign='center'>
                <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                  <Header as='h3' style={{ fontSize: '2em' }}>Corporations</Header> 
                    <CorporationsQuickView/>
                </Grid.Column>
                <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                  <Header as='h3' style={{ fontSize: '2em' }}>Current Investments</Header>
                    <InvestmentsQuickView/>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>

          <Segment  style={{ padding: '8em 0em' }} vertical>
            <Grid container stackable verticalAlign='middle'>
              <Grid.Row>
                <Grid.Column width={14}> 
                  <Header as='h3' style={{ fontSize: '2em' }}>Currencies Monthly Rates</Header>
                  <CurrenciesQuickView/>
                </Grid.Column> 
              </Grid.Row>
              <Grid.Row>
                <Grid.Column textAlign='center'>
                  <Button as={Link} to='/currencies#currencies-div' size='huge'>Check Them Out</Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>

          <Segment style={{ padding: '0em' }} vertical>
            <Grid celled='internally' columns='equal' stackable>
              <Grid.Row textAlign='center'>
                <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                  <Header as='h3' style={{ fontSize: '2em' }}>"What a Great Place to Invest"</Header>
                  <p style={{ fontSize: '1.33em' }}>That is what they all say about us</p>
                </Grid.Column>
                <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                  <Header as='h3' style={{ fontSize: '2em' }}>"The New Upcoming Wall Street."</Header>
                  <p style={{ fontSize: '1.33em' }}>
                    <Image avatar src='/assets/images/avatar/large/nan.jpg' />
                    <b>William Dudley</b> New York Fed leader 
                  </p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>

          <Segment style={{ padding: '8em 0em' }} vertical>
            <Container text>
              <Header as='h3' style={{ fontSize: '2em' }}>Investing in Crypto Currency, Grabs Your Attention</Header>
              <p style={{ fontSize: '1.33em' }}>
                Instead of focusing on investing in crypto currency and hard work, we have learned how to master the art of investment
                by providing a market place of broad and generic content that can seem massive, monolithic
                and worth your attention.
              </p>
              <Button as='a' size='large'>Read More</Button>

              <Divider
                as='h4'
                className='header'
                horizontal
                style={{ margin: '3em 0em', textTransform: 'uppercase' }}
              >
                <a href='#'>More</a>
              </Divider>

              <Header as='h3' style={{ fontSize: '2em' }}>Did We Tell You About Our Generating Investments?</Header>
              <p ref={""} style={{ fontSize: '1.33em' }}>
                Yes I know you probably disregarded the earlier boasts as non-sequitur filler content, but it's really
                true.
                It took awahile to figure it out, but our system can do it.
              </p>
              <Button as='a' size='large'>I'm Still Quite Interested</Button>
            </Container>
          </Segment>
      </div>
    )
  }
}
export default HomepageLayout;
