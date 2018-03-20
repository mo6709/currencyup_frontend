import fetch from 'isomorphic-fetch';

const localBackendURL = "http://localhost:3000/api/v1/";
const herokuBackendUrl = "https://currencyup-backend.herokuapp.com/api/v1/";
// process.env.NODE_ENV === "development" ?  localBackendURL : herokuBackendUrl;
export const baseURL = localBackendURL;

const headers = { 'Content-Type': 'application/json', 'AUTHORIZATION': `${localStorage.token}` };

const jsonStrinify = content => JSON.stringify(content);

const uriCreator = (path, accountInfo) => {
	let uri = baseURL;
	switch (path){
		case 'login':
		    uri += accountInfo.accountType + '_' + path;
		    break;
		case 'signup':
		    uri += accountInfo[Object.keys(accountInfo)[0]].accountType + '_' + path;
		    break;
		case 'update':
            const type = !!accountInfo['first_name'] ? 'investors' : 'corporations'
		    uri += type +'/' + accountInfo.id;
		    break;
	}
	return uri;
}

const auth = path => accountInfo => {
	return fetch(uriCreator(path, accountInfo), {
    method: 'POST',
    headers: headers,
    body: jsonStrinify(accountInfo)  
    }).then(response => response.json());
}

//api
export default {
	account: {
		login: auth('login'),
        signup: auth('signup'),
        update: auth('update')
	},
};