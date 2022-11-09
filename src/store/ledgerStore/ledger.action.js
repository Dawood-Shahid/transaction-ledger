export const ADD_LEDGER = 'ADD_LEDGER';
export const EDIT_LEDGER = 'EDIT_LEDGER';
export const DELETE_LEDGER = 'DELETE_LEDGER';
export const SELECTED_LEDGER = 'SELECTED_LEDGER';
export const ADD_TRANSACTION = 'ADD_TRANSACTION';
export const UPDATE_TRANSACTION = 'UPDATE_TRANSACTION';
export const SELECTED_TRANSACTION = 'SELECTED_TRANSACTION';
export const DELETE_TRANSACTION = 'DELETE_TRANSACTION';

//! Need success functions for all these actions
export const addLedger = payload => ({
  type: ADD_LEDGER,
  payload,
});

export const editLedger = payload => ({
  type: EDIT_LEDGER,
  payload,
});

export const deleteLedger = payload => ({
  type: DELETE_LEDGER,
  payload,
});

export const setSelectedLedger = payload => ({
  type: SELECTED_LEDGER,
  payload,
});

export const addTransaction = payload => ({
  type: ADD_TRANSACTION,
  payload,
});

export const updateTransaction = payload => ({
  type: UPDATE_TRANSACTION,
  payload,
});

export const setSelectedTransaction = payload => ({
  type: SELECTED_TRANSACTION,
  payload,
});

export const deleteTransaction = payload => ({
  type: DELETE_TRANSACTION,
  payload,
});
