import { combineReducers } from 'redux';
import accounts from './accountsReducer';
import categories from './categoriesReducer';
import transactions from './transactionsReducer';
import transfers from './transfersReducer';
import navigator from './navigatorReducer';
import account from './accountReducer';
import defaultCurrency from './currencyReducer';

const appReducer = combineReducers({
  accounts,
  categories,
  transactions,
  transfers,
  navigator,
  account,
  defaultCurrency,
});

export default appReducer;
