import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {BottomActionSheetModal} from './BottomActionSheetModal';

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

const mapStateToProps = state => ({
  selectedTransaction: state.ledger.selectedTransaction,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BottomActionSheetModal);
