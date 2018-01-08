import React from 'react';

const AccountInvestorInfo = ({ accountInfo }) => {
    const { id, first_name, last_name, region } = accountInfo.info;
    return(
        <div className="DottedBox">
            <p>Hello form InvestoreInfo smart container</p>
            <h1>Name: {first_name} {last_name}</h1>
            <p>Id: {id}</p>
            <p>Region: {region}</p>
        </div>
    )
}

export default AccountInvestorInfo;