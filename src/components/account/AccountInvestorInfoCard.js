import React from 'react';
import { Container, Card, Icon } from 'semantic-ui-react';
import LikeButton from '../../containers/LikeButton';

const AccountInvestorInfoCard = ({ accountInfo }) => {
    const { id, email, first_name, last_name, region, created_at, updated_at } = accountInfo.info;
    return(
    	<div className="DottedBox">
	        <Card  style={{ margin: 10 }}>
				<Card.Content>
				  <Card.Header>
				    {first_name} {last_name}
				  </Card.Header>
				  <Card.Meta>
				    <span className='date'>
				      Joined in {created_at.slice(0, 10)}
				    </span>
				  </Card.Meta>
				  <Card.Description textAlign='left'>
				    <p style={{ fontSize: '1.33em' }}>                
					    <b>Investor Id: </b>{id}
					</p>
				    <p style={{ fontSize: '1.33em' }}>                
					    <b>Account Email: </b>{email}
					</p>
					<p style={{ fontSize: '1.33em' }}>                
					    <b>Region: </b>{region}
					</p>
					<p style={{ fontSize: '1.33em' }}>                
					    <b>Updated Info at: </b>{updated_at.slice(0, 10)}
					</p>
				  </Card.Description>
				</Card.Content>
				<Card.Content extra>
				  <a>
				    <Icon name='user' />
				    Investor
				  </a>
				  <LikeButton/>
				</Card.Content>
			</Card>
		</div>
	)
}

export default AccountInvestorInfoCard;