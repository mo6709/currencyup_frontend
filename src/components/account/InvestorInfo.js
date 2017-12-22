import React from 'react';

const InvestorInfo = ({ accountInfo }) => {
    const { id, name } = accountInfo.info;
    return(
        <div>
            <p>Hello form InvestoreInfo smart container</p>
            <p>Id: {id}</p><h1>Investor Name:{name}</h1>
        </div>
    )
}

export default InvestorInfo;