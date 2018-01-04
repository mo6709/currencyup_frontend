import React from 'react'

const CurrencyList = ({ CurrenciesData }) => {
    const currencyDivs = CurrenciesData.map(currency => {
        return (
            <div key={currency.id} className="currency">
              <h2>Name: {currency.name}</h2>
              <h4>Rate: {currency.rate}</h4>
              <h4>Region: {currency.region}</h4>
            </div>
        )
    })

    return (
        <div className="DottedBox">
            <h1>All Currencies</h1>
            {currencyDivs}
        </div>    
    )
}

export default CurrencyList;