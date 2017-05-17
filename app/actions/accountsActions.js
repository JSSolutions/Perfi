import { createActions } from 'redux-actions';
import actionTypes from '../constants/actionTypes';

export const { createAccount, updateAccount, deleteAccount, performTransfer } = createActions(
  actionTypes.CREATE_ACCOUNT,
  actionTypes.UPDATE_ACCOUNT,
  actionTypes.DELETE_ACCOUNT,
  actionTypes.PERFORM_TRANSFER,
);
