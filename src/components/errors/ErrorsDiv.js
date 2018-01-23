import React from 'react';

const ErrorsDiv = ({ messages }) =>{
	let errorParagraphs = "";
    for(let key in messages){
        errorParagraphs += `${key.split('_').join(' ')}: ${messages[key].join(', ')}\n`
    }
	return(
		<div className="DottedBox">
		  {errorParagraphs}
		</div>
	)
}

export default ErrorsDiv;