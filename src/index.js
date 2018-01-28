import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import { saveState, loadState } from './localStorage';
import throttle from 'lodash/throttle';
import '../node_modules/react-bootstrap/dist/react-bootstrap.js';

const presistedState = loadState();

const store = createStore(
    rootReducer,
    presistedState,
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);

store.subscribe(throttle(() => {
	const { account, currencies, corporations, investments, session, } = store.getState();
    const storeToSave = { 
    	account: { accountType: account.accountType, info: account.info, errors: '' },
	    currencies: { loading: false, all: currencies.all },
	    corporations: { loading: false, all: corporations.all },
        investments: { loading: false, all: investments.all },
        session: { loggedIn: session.loggedIn, loading: false, errors: '' }
    }
	saveState(storeToSave);
}, 1000));

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();

