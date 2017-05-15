import React from 'react'
import Draft from 'draft-js'
import PrismDraftDecorator from 'draft-js-prism'
import PropTypes from 'prop-types'
import CodeUtils from 'draft-js-code'
import './code.css'

const {
    Editor,
    EditorState,
    RichUtils,
    Decorator,
    convertFromRaw
} = Draft

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
    var decorator = new PrismDraftDecorator()
    var contentState = convertFromRaw({
      entityMap: {},
      blocks: [
        {
          type: 'code-block',
          text: 'console.log(CODE_AWAY)'
        }
      ]
    })

    this.state = {
      editorState: EditorState.createWithContent(contentState, decorator)
    }

    this.focus = () => this.refs.editor.focus()
    this.onChange = (editorState) => this.setState({ editorState })

    this.handleKeyCommand = (command) => this._handleKeyCommand(command)
    this.keyBindingFn = (e) => this._keyBindingFn(e)
    this.toggleBlockType = (type) => this._toggleBlockType(type)
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style)
    this.onTab = (e) => this._onTab(e)
    this.onReturn = (e) => this._onReturn(e)
  }

  _handleKeyCommand (command) {
    const { editorState } = this.state
    let newState

    if (CodeUtils.hasSelectionInBlock(editorState)) {
      newState = CodeUtils.handleKeyCommand(editorState, command)
    }

    if (!newState) {
      newState = RichUtils.handleKeyCommand(editorState, command)
    }

    if (newState) {
      this.onChange(newState)
      return true
    }
    return false
  }

  _keyBindingFn (e) {
    let editorState = this.state.editorState
    let command

    if (CodeUtils.hasSelectionInBlock(editorState)) {
      command = CodeUtils.getKeyBinding(e)
    }
    if (command) {
      return command
    }

    return Draft.getDefaultKeyBinding(e)
  }

  _toggleBlockType (blockType) {
    this.onChange(
        RichUtils.toggleBlockType(
            this.state.editorState,
            blockType
        )
    )
  }

  _toggleInlineStyle (inlineStyle) {
    this.onChange(
        RichUtils.toggleInlineStyle(
            this.state.editorState,
            inlineStyle
        )
    )
  }

  _onTab (e) {
    let editorState = this.state.editorState

    if (!CodeUtils.hasSelectionInBlock(editorState)) {
      return
    }

    this.onChange(
        CodeUtils.handleTab(e, editorState)
    )
  }

  _onReturn (e) {
    let editorState = this.state.editorState
    if (!CodeUtils.hasSelectionInBlock(editorState)) {
      return
    }

    this.onChange(
        CodeUtils.handleReturn(e, editorState)
    )
    return true
  }

  className = 'RichEditor-editor'

  styleMap = {
    CODE: {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
      fontSize: 16,
      padding: 2
    }
  }

  /* componentDidMount () {
    this.onChange(RichUtils.toggleBlockType(
                this.state.editorState,
                'code-block'
            ))
  } */

  render () {
    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor'

    return (
      <div className={className} onClick={this.focus}>
        <Editor
          blockStyleFn={this.getBlockStyle}
          customStyleMap={this.styleMap}
          editorState={this.state.editorState}
          handleKeyCommand={this.handleKeyCommand}
          keyBindingFn={this.keyBindingFn}
          onChange={this.onChange}
          ref='editor'
          spellCheck
          handleReturn={this.onReturn}
          onTab={this.onTab}
        />
      </div>
    )
  }
}

CodeEditorLeaf.propTypes = {
  data       : PropTypes.object.isRequired,
  meta       : PropTypes.object.isRequired,
  update     : PropTypes.func.isRequired
}

export default CodeEditorLeaf
