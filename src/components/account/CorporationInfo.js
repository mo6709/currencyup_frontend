import React from 'react';

const CorporationInfo = ({ accountInfo }) => {
    const { id, name, title } = accountInfo.info;
    return(
        <div>
            <p>Hello form CorporationInfo smart container</p>
            <p>Id: {id}</p>
            <h1>Corporation Name:{name}</h1>
            <h2>Title: {title}</h2>
        </div>
    )
}

export default CorporationInfo;
