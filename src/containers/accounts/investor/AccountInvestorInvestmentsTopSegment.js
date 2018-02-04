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



class AccountInvestorInvestmentsTopSegment extends Component{
  constructor(props){
    super(props);
  }

  render(){
    const { account, currencies } = this.props;

    return(
        <Segment style={{ padding: '8em 0em' }} vertical>
			<Container text>
		        
		       
				<Divider
				    horizontal
				    style={{ margin: '3em 0em', textTransform: 'uppercase' }} />

				<Link to={{ pathname:`/account/investors/${account.info.id}` }}><Button icon style={{ margin: '1em 2px'}}><Icon name='info circle'/></Button></Link>
				<Link to={{ pathname:`/account/investors/${account.info.id}/Edit` }}><Button style={{ margin: '1em 2px'}}><Icon name='edit'/>Edit Account</Button></Link>
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



