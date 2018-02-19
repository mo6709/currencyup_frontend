import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import LikeButton from '../../containers/LikeButton';

const AccountCorporationInfoCard = ({ accountInfo }) => {
    const { id, name, title, email, created_at, updated_at, regions_array, investment_period } = accountInfo.info;
    return(
        <div className="DottedBox">
            <Card  style={{ margin: 10 }}>
				<Card.Content>
					<Card.Header>
					    {name}
					</Card.Header>
					<Card.Meta>
						<span className='date'>
						  Joined in {created_at.slice(0, 10)}
						</span>
					</Card.Meta>
					<Card.Description textAlign='left'>
						<p style={{ fontSize: '1.33em' }}>                
						    <b>Corporation Id: </b>{id}
						</p>
						<p style={{ fontSize: '1.33em' }}>                
						    <b>Title: </b>{title}
						</p>
						<p style={{ fontSize: '1.33em' }}>                
						    <b>Corporation Email: </b>{email}
						</p>
						<p style={{ fontSize: '1.33em' }}>                
						    <b>Regions: </b>{regions_array.join(", ")}
						</p>
						<p style={{ fontSize: '1.33em' }}>                
						    <b>Investment Period: </b>{investment_period} Months
						</p>
						<p style={{ fontSize: '1.33em' }}>                
						    <b>Updated Info at: </b>{updated_at.slice(0, 10)}
						</p>
					</Card.Description>
				</Card.Content>
				<Card.Content extra>
					<a>
						<Icon name='building' />
						Corporation
					</a>
					<LikeButton />
				</Card.Content>
			</Card>
        </div>
    )
}

export default AccountCorporationInfoCard;
