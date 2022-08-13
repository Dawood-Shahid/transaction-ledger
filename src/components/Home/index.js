import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Home from './Home';
import {setSelectedLedger} from '../../store/ledgerStore/ledger.action';

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setSelectedLedger,
    },
    dispatch,
  );

const mapStateToProps = state => ({
  selectedLedger: state.ledger.selectedLedger,
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
