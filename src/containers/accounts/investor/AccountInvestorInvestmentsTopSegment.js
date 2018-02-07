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
import InvestorInvestmentsTable from '../../investments/InvestorInvestmentsTable';



class AccountInvestorInvestmentsTopSegment extends Component{
  constructor(props){
    super(props);
  }

  render(){
    const { account, currencies } = this.props;

    return(
        <Segment style={{ padding: '8em 0em' }} vertical>
			<Container text textAlign="center">
		        <InvestorInvestmentsTable />
				<Link to={`/account/investors/${account.info.id}#investor-info`}><Button icon style={{ margin: '1em 2px'}}><Icon name='info circle'/></Button></Link>
				<Link to={`/account/investors/${account.info.id}/Edit#investor-info`}><Button style={{ margin: '1em 2px'}}><Icon name='edit'/>Edit Account</Button></Link>
			</Container>
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

export default connect(mapStateToProps)(AccountInvestorInvestmentsTopSegment);



