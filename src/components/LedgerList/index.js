import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import LedgerList from './LedgerList';
import {
  addLedger,
  editLedger,
  deleteLedger,
  setSelectedLedger,
} from '../../store/ledgerStore/ledger.action';

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addLedger,
      editLedger,
      deleteLedger,
      setSelectedLedger,
    },
    dispatch,
  );

const mapStateToProps = state => ({
  ledgerList: state.ledger.ledgerList,
});

export default connect(mapStateToProps, mapDispatchToProps)(LedgerList);
