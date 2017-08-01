import React from 'react'
import PropTypes from 'prop-types'

export class OnRenderCallback extends React.Component {

  render () {
    this.props.callback()
    return null
  }
}

OnRenderCallback.propTypes = {
  callback       : PropTypes.func.isRequired
}

export default OnRenderCallback
