import { connect } from 'react-redux'
import LeafComponent from '../components/Leaf'
import { updateLeafData } from '../modules/leaflet.js'
import { leafTypeSelector, leafDataSelector } from './selectors'

const mapDispatchToProps = ({
  updateLeafData : (ID, data) => updateLeafData(ID, data)
})

const mapStateToProps = (state, props) => {
  return {
    leafType : leafTypeSelector(state, props.item.leafID),
    leafData : leafDataSelector(state, props.item.leafID),
    leafID   : props.item.leafID
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeafComponent)
