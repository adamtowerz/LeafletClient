import { connect } from 'react-redux'
import NavPanelComponent from './NavPanel'
// import { setFilterType } from '../../dashboardReducer.js'

const mapDispatchToProps = ({
  // setFilterType : (type) => setFilterType(type)
})

const mapStateToProps = (state, props) => ({
  // filterType : (state) => state.filterType
})

export default connect(mapStateToProps, mapDispatchToProps)(NavPanelComponent)
