import {deepClone} from '../../core/helper/HelperFunctions';
import {
  ADD_LEDGER,
  EDIT_LEDGER,
  DELETE_LEDGER,
  SELECTED_LEDGER,
} from './ledger.action';

const INITIAL_STATE = {
  ledgerList: [
    {
      id: '1660387506918',
      title: 'North Town phase II, block 1, Ext-2201',
      createdAt: '1660387506918',
      cashIn: 50000,
      cashOut: 15000,
      isDeleted: 0,
    },
  ],
  selectedLedger: {},
  ledgerTransactionList: [],
};

export const ledgerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_LEDGER:
      return {
        ...state,
        ledgerList: [action.payload, ...state.ledgerList],
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
    default:
      return {
        ...state,
      };
  }
};
