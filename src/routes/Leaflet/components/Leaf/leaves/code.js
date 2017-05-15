import React from 'react'
import { Editor, EditorState } from 'draft-js'
import PropTypes from 'prop-types'

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
  constructor (props) {
    super(props)
    this.state = { editorState: EditorState.createEmpty() }
    this.onChange = (editorState) => this.setState({ editorState })
  }

  render () {
    return (
      <Editor editorState={this.state.editorState} onChange={this.onChange} />
    )
  }
}

CodeEditorLeaf.propTypes = {
  data       : PropTypes.object.isRequired,
  meta       : PropTypes.object.isRequired,
  update     : PropTypes.func.isRequired
}

export default CodeEditorLeaf
