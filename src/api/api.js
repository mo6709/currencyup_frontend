import fetch from 'isomorphic-fetch';

const localBackendURL = "http://localhost:3000/api/v1/";
const herokuBackendUrl = "https://currencyup-backend.herokuapp.com/api/v1/";
// process.env.NODE_ENV === "development" ?  localBackendURL : herokuBackendUrl;
export const baseURL = herokuBackendUrl;

const headers = { 'Content-Type': 'application/json', 'AUTHORIZATION': `${localStorage.token}` };

const jsonStrinify = content => JSON.stringify(content);

const uriCreator = (path, accounytInfo) => {
	let uri = baseURL;
	switch (path){
		case 'login':
		    uri += accounytInfo.accountType + '_' + path
		    return;
		case 'signup':
		    uri += accounytInfo[Object.keys(accounytInfo)[0]].accountType + '_' + path
		    return;
		case 'update':
            const type = !!accounytInfo['first_name'] ? 'investors' : 'corporations'
		    uri += type +'/' + accounytInfo.id
		    return;
	}
	return uri;
}

const auth = path => accounytInfo => {
	return fetch(uriCreator(path, accounytInfo), {
    method: 'POST',
    headers: headers,
    body: jsonStrinify(accounytInfo)  
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