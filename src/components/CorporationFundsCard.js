import React from 'react';
import { VictoryPie } from 'victory';
import { Card, Icon} from 'semantic-ui-react';

const CorporationFundsCard = ({ currencyCorporationsData, currenciesData }) => {
	let fundsData = []
	let fundPs = currencyCorporationsData.map((fund) => {
		const currency = currenciesData.all.find(c => c.id === fund.currency_id);
		const amount = fund.total_amount.toFixed(4);
		fundsData.push({ x: currency.iso_code, y: amount });
		return(<p key={fund.id}>Ammount: {amount} {currency.name}</p>)
	})
	return(
		<div className="DottedBox">
		    <Card centered style={{ width: '42em', margin: 10 }}>
			    <VictoryPie
			      padAngle={3}
			      innerRadius={100}
				  data={fundsData}
				/>
				<Card.Content extra>
				  <a>
				    <Icon name='money' />
				    {fundPs}
				  </a>
				</Card.Content>
			</Card>
		</div>
	)
}

export default CorporationFundsCard;
