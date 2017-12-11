import { combineReducers } from 'redux'
import accountReducer from './accountReducer'
import currenciesReducer from './currenciesReducer'
import investmentsReducer from './investmentsReducer'
import sessionReducer from './sessionReducer'

const rootReducer = combineReducers({
    account: accountReducer,
    currencies: currenciesReducer,
    investments: investmentsReducer,
    session: sessionReducer

})

export default rootReducer;