import { connect } from 'react-redux'
import LeafComponent from './Leaf'
import { updateLeafData } from '../../notebookReducer.js'
import { leafTypeSelector, leafDataSelector } from '../../selectors/index'

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
