import {configureStore} from '@reduxjs/toolkit';

import {ledgerReducer} from './ledgerStore/ledger.reducer';

export const store = configureStore({
  reducer: {
    ledger: ledgerReducer,
  },
});
