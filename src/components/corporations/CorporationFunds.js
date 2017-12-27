import react from 'react'

const CorporationFunds = ({ currencies }) => {
	let funds = currencies.map((currency) => {
		return(
			<div key={currency.id}>
            
			</div>
		)
	})
	return(
		<div>
		    <p>Corporations Funds</p>
			{funds}
		</div>
	)
}

export default CorporationFunds;