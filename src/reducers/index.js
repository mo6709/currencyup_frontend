import { combineReducers } from 'redux';
import accountReducer from './accountReducer';
import currenciesReducer from './currenciesReducer';
import investmentsReducer from './investmentsReducer';
import sessionReducer from './sessionReducer';
import corporationsReducer from './corporationsReducer';

const rootReducer = combineReducers({
    account: accountReducer,
    currencies: currenciesReducer,
    corporations: corporationsReducer,
    investments: investmentsReducer,
    session: sessionReducer
})

export default rootReducer;