import React from 'react'
import PropTypes from 'prop-types'
import CodeMirror from 'react-codemirror'
import '../../../../../../node_modules/codemirror/lib/codemirror.css'
import '../../../../../../node_modules/codemirror/mode/javascript/javascript.js'

export let actions = (data) => {
  return {
    bar: [
      {
        iconName: 'bookmark',
        onClick: { isEmphasized: !data.isEmphasized },
        style: (data) => {
          if (data.isEmphasized) return { color: '#4CAF50' }
          return
        }
      },
      {
        iconName: 'games',
        onClick: function () {}
      },
      {
        iconName: 'more_vert',
        onClick: { showTrough: !data.showTrough }
      }
    ],
    trough: [
      {
        iconName: 'delete',
        onClick: { delete: true }
      },
      {
        iconName: 'place',
        onClick: { }
      }
    ]
  }
}

export class CodeEditorLeaf extends React.Component {
  render () {
    let options = {
      lineNumbers: true,
      mode: 'javascript'
    }
    return <CodeMirror value={this.props.data.code} onChange={(nv) => {
      this.props.update({ code: nv })
    }} options={options} />
  }
}

CodeEditorLeaf.propTypes = {
  data       : PropTypes.object.isRequired,
  meta       : PropTypes.object.isRequired, // eslint-disable-line react/no-unused-prop-types
  update     : PropTypes.func.isRequired
}

export default CodeEditorLeaf
