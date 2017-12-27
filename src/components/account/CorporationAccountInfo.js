import React from 'react';

const CorporationAccountInfo = ({ accountInfo }) => {
    const { id, name, title } = accountInfo.info;
    return(
        <div style={{border: '10px'}}>
            <p>Hello form CorporationInfo smart container</p>
            <h1>Corporation Name:{name}</h1>
            <p>Id: {id}</p>
            <h2>Title: {title}</h2>
        </div>
    )
}

export default CorporationAccountInfo;
