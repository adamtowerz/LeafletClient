import { connect } from 'react-redux'
import ContentPanelComponent from './ContentPanel'
// import { updateLeafData } from '../../dashboardReducer.js'

const mapDispatchToProps = ({})

const mapStateToProps = (state, props) => ({
  filterType : state.dashboard.filterType,
  leaflets : [{
    title: 'Bio 161',
    color: '#D692FC'
  }, {
    title: 'Phys 141',
    color: '#F19393'
  }, {
    title: 'CSE 141',
    color: '#7ED2FA'
  }]

})

export default connect(mapStateToProps, mapDispatchToProps)(ContentPanelComponent)
