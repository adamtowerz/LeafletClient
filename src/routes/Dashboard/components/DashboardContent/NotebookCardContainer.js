import { connect } from 'react-redux'
import NotebookCardComponent from './NotebookCard'
import { fetchDashboardInfoData, openNotebook } from '../../dashboardReducer'

const mapDispatchToProps = {
  selectNotebook: (username, title) => fetchDashboardInfoData(username, title),
  openNotebook: (username, title) => openNotebook(username, title)
}

const mapStateToProps = (state, props) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(NotebookCardComponent)
