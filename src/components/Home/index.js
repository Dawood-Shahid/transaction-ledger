import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Home from './Home';
import {
  setSelectedLedger,
  setSelectedTransaction,
} from '../../store/ledgerStore/ledger.action';

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setSelectedLedger,
      setSelectedTransaction,
    },
    dispatch,
  );

const mapStateToProps = state => ({
  selectedLedger: state.ledger.selectedLedger,
  transactionList: state.ledger.ledgerTransactionList,
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
