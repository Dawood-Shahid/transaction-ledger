import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import TransactionDetail from './TransactionDetail';
import {
  addTransaction,
  updateTransaction,
} from '../../store/ledgerStore/ledger.action';

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addTransaction,
      updateTransaction,
    },
    dispatch,
  );

const mapStateToProps = state => ({
  selectedLedger: state.ledger.selectedLedger,
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionDetail);
