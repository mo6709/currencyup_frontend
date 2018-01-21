import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import { loadState, saveState } from './localStorage';
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
	saveState(store.getState());
}, 1000));

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
