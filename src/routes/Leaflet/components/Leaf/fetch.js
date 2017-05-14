import React from 'react'
import TextField from 'material-ui/TextField'
import brace from 'brace'
import AceEditor from 'react-ace'

import 'brace/mode/javascript'
import 'brace/theme/solarized_dark'

export let fetchTemplate = (type, data, update, meta) => {
  const leafStyles = fetchStyles(type, data)
  switch (type) {
    case 'title':
      return <div style={leafStyles.titleCardBox}>
        <span style={leafStyles.title}>{meta.title}</span>
      </div>
    case 'rawText':
      return <TextField
        value={data.value}
        hintText='Go Type!'
        multiLine
        rows={5}
        style={leafStyles.textFieldStyles}
        onChange={(e, nv) => {
          update({ value: nv })
        }}
      />
    case 'JS':
      return <AceEditor
        value={data.value}
        mode='javascript'
        theme='solarized_dark'
        onChange={(nv) => {
          update({ value: nv })
        }}
        name='xd'
        fontSize={16}
        showGutter={false}
        width='100%'
        editorProps={{
          $blockScrolling: true
        }}
      />
    default:
      return <div>this is a leaf</div>
  }
}
// TODO: move to api
export let fetchStyles = (type, data) => {
  switch (type) {
    case 'title':
      return {
        titleCardBox: {
          height: '10em',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        },
        title: {
          fontWeight: '100',
          fontSize: '1.7em',
          color: '#4CAF50',
          display: 'inline-block',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          width: '100%',
          textAlign: 'center'
        } }
    case 'rawText':
      return {
        textFieldStyles: {
          width: '100%'
        }
      }
    default:
      return false
  }
}
// TODO: move to api
export let fetchActions = (type, data) => {
  switch (type) {
    case 'title':
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
            iconName: 'share',
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
            iconName: 'settings',
            onClick: { }
          }
        ]
      }
    default:
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
}
