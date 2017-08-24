import { connect } from 'react-redux'
import ContentPanelComponent from './ContentPanel'
// import { updateLeafData } from '../../dashboardReducer.js'

const mapDispatchToProps = {}

const mapStateToProps = (state, props) => ({
  filterType : state.dashboard.filterType,
  notebooks : state.dashboard.dashboardContent
})

export default connect(mapStateToProps, mapDispatchToProps)(ContentPanelComponent)
