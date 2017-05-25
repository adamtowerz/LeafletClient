import React from 'react'
import PropTypes from 'prop-types'
import CodeMirror from 'react-codemirror'
import './codeLeaf.scss'
import '../../../../../../node_modules/codemirror/mode/javascript/javascript.js'

export let actions = (data) => {
  return {
    bar: [
      {
        iconName: 'more_vert',
        onClick: { showTrough: !data.showTrough }
      }
    ],
    trough: [
      {
        iconName: 'delete',
        onClick: { delete: true }
      }
    ]
  }
}

export class CodeEditorLeaf extends React.Component {
  render () {
    let options = {
      lineNumbers: true,
      mode: 'javascript',
      theme: 'monokai',
      viewportMargin: Infinity
    }
    let style = {
      minHeight: '4vh',
      padding: '0.2em'
    }
    return <div style={style}>
      <CodeMirror value={this.props.data.code} style={style} onChange={(nv) => {
        this.props.update({ code: nv })
      }} options={options} />
    </div>
  }
}

CodeEditorLeaf.propTypes = {
  data       : PropTypes.object.isRequired,
  meta       : PropTypes.object.isRequired, // eslint-disable-line react/no-unused-prop-types
  update     : PropTypes.func.isRequired
}

export default CodeEditorLeaf
