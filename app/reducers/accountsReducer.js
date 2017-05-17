import { handleActions } from 'redux-actions';
import actionTypes from '../constants/actionTypes';
import { insert, insertAll, update, remove } from '../utils/stateHelper';

const createAccount = (props) => {
  const { name, icon, balance = 0, initialBalance = 0, initialDate = new Date() } = props;

  return { name, icon, balance, initialBalance, initialDate };
};

const defaultAccounts = [
  createAccount({ name: 'Card', icon: 'credit-card' }),
  createAccount({ name: 'Cash', icon: 'cash-multiple' }),
];

const initialState = insertAll({}, defaultAccounts);

const accountsReducer = handleActions({
  [actionTypes.CREATE_ACCOUNT]: (state, { payload }) => insert(state, createAccount(payload)),
  [actionTypes.UPDATE_ACCOUNT]: (state, { payload }) => update(state, payload.id, payload),
  [actionTypes.DELETE_ACCOUNT]: (state, { payload }) => remove(state, payload),
  [actionTypes.PERFORM_TRANSFER]: (state, { payload: { accountFrom, accountTo, value } }) => {
    const withAccountFromUpdated = update(state, accountFrom.id, {
      ...accountFrom,
      balance: accountFrom.balance - value,
    });

    return update(withAccountFromUpdated, accountTo.id, {
      ...accountTo,
      balance: accountTo.balance + value,
    });
  },
}, initialState);

export default accountsReducer;
