import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {BottomActionSheetModal} from './BottomActionSheetModal';
import {deleteTransaction} from '../../store/ledgerStore/ledger.action';

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      deleteTransaction,
    },
    dispatch,
  );

const mapStateToProps = state => ({
  selectedTransaction: state.ledger.selectedTransaction,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BottomActionSheetModal);
