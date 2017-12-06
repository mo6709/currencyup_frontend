import { combinReducers } from 'redux'
import accountReducer from './accountReducer'
import currenciesReducer from './currenciesReducer'
import investmentsReducer from './investmentsReducer'

const rootReducer = combinReducers({
    account: accountReducer,
    currencies: currenciesReducer,
    investments: investmentsReducer
})

export default rootReducer;