import React from 'react';
import { VictoryPie } from 'victory';
import { Card, Icon} from 'semantic-ui-react';

const InvestorFundsCard = ({ currencyInvestorsData, currenciesData }) => {
	let fundsData = [];
	let fundPs = currencyInvestorsData.map((fund) => {
		const currency = currenciesData.all.find(c => c.id === fund.currency_id);
		const amount = fund.total_amount.toFixed(4)
		fundsData.push({ x: currency.iso_code, y: amount })
		return(<p key={fund.id}>Amount: {amount} {currency.name}</p>)
	})
	const message = <h3>You have no funds</h3>;

	return(
		<div className="DottedBox">
			<Card centered style={{ width: '42em', margin: 10 }}>
			    {fundsData.length > 0 ? <VictoryPie padAngle={3} innerRadius={100} data={fundsData}/> : message }
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

export default InvestorFundsCard;


