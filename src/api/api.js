const localBackendURL = "http://localhost:3000/api/v1/";

const herokuBackendUrl = "https://currencyup-backend.herokuapp.com/api/v1/";

export const baseURL = localBackendURL;
// process.env.NODE_ENV === "development" ?  localBackendURL : herokuBackendUrl;