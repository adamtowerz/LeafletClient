import { connect } from 'react-redux'
import Leaf from '../components/Leaf'
import { leafTypeSelector, leafDataSelector } from './selectors'
const mapDispatchToProps = {

}

const mapStateToProps = (state, props) => ({
  leafType : leafTypeSelector(state, props.leafID),
  leafData : leafDataSelector(state, props.leafID)
})

export default connect(mapStateToProps, mapDispatchToProps)(Leaf)
