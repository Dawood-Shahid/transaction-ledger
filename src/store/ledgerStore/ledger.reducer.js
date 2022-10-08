import {deepClone} from '../../core/helper/HelperFunctions';
import {
  ADD_LEDGER,
  EDIT_LEDGER,
  DELETE_LEDGER,
  SELECTED_LEDGER,
  ADD_TRANSACTION,
  SELECTED_TRANSACTION,
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
  ledgerTransactionList: [
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
      const clonedSelectedLedger = deepClone(state.selectedLedger);
      if (action.payload.type === TRANSACTION_TYPE_EXPENSE) {
        clonedSelectedLedger.cashOut += action.payload.amount;
      } else {
        clonedSelectedLedger.cashIn += action.payload.amount;
      }
      return {
        ...state,
        ledgerTransactionList: [...state.ledgerTransactionList, action.payload],
        selectedLedger: clonedSelectedLedger,
      };
    case SELECTED_TRANSACTION:
      return {
        ...state,
        selectedTransaction: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
