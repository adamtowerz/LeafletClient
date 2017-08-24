import { connect } from 'react-redux'
import InfoPanelComponent from './InfoPanel.js'
// import { updateLeafData } from '../../dashboardReducer.js'

const mapDispatchToProps = ({})

const mapStateToProps = (state, props) => ({
  selectedNotebook : state.dashboard.selectedNotebook
})

export default connect(mapStateToProps, mapDispatchToProps)(InfoPanelComponent)
