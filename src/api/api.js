import fetch from 'isomorphic-fetch';

const localBackendURL = "http://localhost:3000/api/v1/";
const herokuBackendUrl = "https://currencyup-backend.herokuapp.com/api/v1/";
// process.env.NODE_ENV === "development" ?  localBackendURL : herokuBackendUrl;
export const baseURL = herokuBackendUrl;

const headers = { 'Content-Type': 'application/json', 'AUTHORIZATION': `${localStorage.token}` };
const jsonStrinify = content => JSON.stringify(content);

//apis
export default {
	account: {
		login: credentials => 
			fetch(baseURL + `${credentials.accountType}_login`, {
            method: 'POST',
            headers: headers,
            body: jsonStrinify(credentials)  
            }).then(response => response.json()),

        signup: {}
	},
};