import { connect } from 'react-redux'
import FilterButtonComponent from './FilterButton'
import { setFilterType } from '../../dashboardReducer.js'

const mapDispatchToProps = {
  setFilterType : (type) => setFilterType(type)
}

const mapStateToProps = (state, props) => {
  return {
    filterType : state.dashboard.filterType
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterButtonComponent)
