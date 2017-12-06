import { combineReducers } from 'redux'
import accountReducer from './accountReducer'
import currenciesReducer from './currenciesReducer'
import investmentsReducer from './investmentsReducer'

const rootReducer = combineReducers({
    account: accountReducer,
    currencies: currenciesReducer,
    investments: investmentsReducer
})

export default rootReducer;