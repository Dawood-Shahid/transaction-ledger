import {deepClone} from '../../core/helper/HelperFunctions';
import {
  ADD_LEDGER,
  EDIT_LEDGER,
  DELETE_LEDGER,
  SELECTED_LEDGER,
  ADD_TRANSACTION,
  SELECTED_TRANSACTION,
  DELETE_TRANSACTION,
  UPDATE_TRANSACTION,
} from './ledger.action';
import {TRANSACTION_TYPE_EXPENSE} from '../../appConstants';

const INITIAL_STATE = {
  ledgerList: [
    {
      id: '1660387506918',
      title: 'North Town phase II, block 1, Ext-2201',
      createdAt: '1660387506918',
      cashIn: 80000,
      cashOut: 45000,
      isDeleted: 0,
    },
  ],
  selectedLedger: {},
  transactionList: [
    {
      id: 1,
      title: 'Monthly Income',
      transactionDate: '1660387506918',
      transactionTime: '1660387506918',
      category: 'Salary',
      paymentMethod: 'Online',
      balance: '80000',
      amount: '80000',
      type: 'income',
      attachments: [1, 2, 3, 4],
    },
    {
      id: 2,
      title: 'Utility',
      transactionDate: '1660387506918',
      transactionTime: '1660387506918',
      category: 'Bills',
      paymentMethod: 'Cash',
      balance: '60000',
      amount: '20000',
      type: 'expense',
      attachments: [1],
    },
    {
      id: 3,
      title: 'Grocery Items',
      transactionDate: '1660387506918',
      transactionTime: '1660387506918',
      category: 'Grocery',
      paymentMethod: 'Cash',
      balance: '35000',
      amount: '25000',
      type: 'expense',
      attachments: [1, 2, 3],
    },
  ],
  selectedTransaction: {},
};

export const ledgerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_LEDGER:
      return {
        ...state,
        ledgerList: [...state.ledgerList, action.payload],
      };
    case EDIT_LEDGER:
      const clonedListForEdit = deepClone(state.ledgerList);
      const ledgerIndexForEdit = clonedListForEdit.findIndex(
        item => item.id === action.payload.id,
      );
      clonedListForEdit[ledgerIndexForEdit].title = action.payload.title;
      return {
        ...state,
        ledgerList: clonedListForEdit,
      };
    case DELETE_LEDGER:
      const clonedListForDelete = deepClone(state.ledgerList);
      const ledgerIndexToDelete = clonedListForDelete.findIndex(
        item => item.id === action.payload.id,
      );
      clonedListForDelete.splice(ledgerIndexToDelete, 1);
      return {
        ...state,
        ledgerList: clonedListForDelete,
      };
    case SELECTED_LEDGER:
      return {
        ...state,
        selectedLedger: action.payload,
      };
    case ADD_TRANSACTION:
      const clonedSelectedLedgerForAdd = deepClone(state.selectedLedger);
      if (action.payload.type === TRANSACTION_TYPE_EXPENSE) {
        clonedSelectedLedgerForAdd.cashOut += action.payload.amount;
      } else {
        clonedSelectedLedgerForAdd.cashIn += action.payload.amount;
      }
      const clonedLedgerListForAdd = deepClone(state.ledgerList);
      const selectedLedgerIndexForAdd = clonedLedgerListForAdd.findIndex(
        ele => ele.id === clonedSelectedLedgerForAdd.id,
      );
      clonedLedgerListForAdd[selectedLedgerIndexForAdd] =
        clonedSelectedLedgerForAdd;
      return {
        ...state,
        transactionList: [...state.transactionList, action.payload],
        selectedLedger: clonedSelectedLedgerForAdd,
        ledgerList: clonedLedgerListForAdd,
      };
    case UPDATE_TRANSACTION:
      const clonedTransactionListForUpdate = deepClone(state.transactionList);
      const TransactionListIndexForUpdate =
        clonedTransactionListForUpdate.findIndex(
          ele => ele.id === action.payload.id,
        );
      const clonedSelectedLedgerForUpdate = deepClone(state.selectedLedger);
      if (action.payload.type === TRANSACTION_TYPE_EXPENSE) {
        clonedSelectedLedgerForUpdate.cashOut -=
          clonedTransactionListForUpdate[TransactionListIndexForUpdate].amount;
        clonedSelectedLedgerForUpdate.cashOut += action.payload.amount;
      } else {
        clonedSelectedLedgerForUpdate.cashIn -=
          clonedTransactionListForUpdate[TransactionListIndexForUpdate].amount;
        clonedSelectedLedgerForUpdate.cashIn += action.payload.amount;
      }
      const clonedLedgerListForUpdate = deepClone(state.ledgerList);
      const selectedLedgerIndexForUpdate = clonedLedgerListForUpdate.findIndex(
        ele => ele.id === clonedSelectedLedgerForUpdate.id,
      );
      clonedLedgerListForUpdate[selectedLedgerIndexForUpdate] =
        clonedSelectedLedgerForUpdate;
      clonedTransactionListForUpdate.splice(TransactionListIndexForUpdate, 1);
      // clonedTransactionListForUpdate[TransactionListIndexForUpdate] =
      //   action.payload;
      return {
        ...state,
        transactionList: [...clonedTransactionListForUpdate, action.payload],
        selectedLedger: clonedSelectedLedgerForUpdate,
        ledgerList: clonedLedgerListForUpdate,
      };
    case SELECTED_TRANSACTION:
      return {
        ...state,
        selectedTransaction: action.payload,
      };
    case DELETE_TRANSACTION:
      const clonedSelectedLedgerForDelete = deepClone(state.selectedLedger);
      if (action.payload.type === TRANSACTION_TYPE_EXPENSE) {
        clonedSelectedLedgerForDelete.cashOut -= action.payload.amount;
      } else {
        clonedSelectedLedgerForDelete.cashIn -= action.payload.amount;
      }
      const clonedTransactionListForDelete = deepClone(state.transactionList);
      const TransactionListIndexForDelete =
        clonedTransactionListForDelete.findIndex(
          ele => ele.id === action.payload.id,
        );
      clonedTransactionListForDelete.splice(TransactionListIndexForDelete, 1);
      const clonedLedgerListForDelete = deepClone(state.ledgerList);
      const selectedLedgerIndexForDelete = clonedLedgerListForDelete.findIndex(
        ele => ele.id === clonedSelectedLedgerForDelete.id,
      );
      clonedLedgerListForDelete[selectedLedgerIndexForDelete] =
        clonedSelectedLedgerForDelete;
      return {
        ...state,
        transactionList: clonedTransactionListForDelete,
        selectedLedger: clonedSelectedLedgerForDelete,
        ledgerList: clonedLedgerListForDelete,
      };
    default:
      return {
        ...state,
      };
  }
};
