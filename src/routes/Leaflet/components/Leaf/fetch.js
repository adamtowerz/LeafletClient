import React from 'react'
import TextField from 'material-ui/TextField'

export let fetchTemplate = (type, data) => {
  const leafStyles = fetchStyles(type, data)
  switch (type) {
    case 'title':
      return <div style={leafStyles.titleCardBox}>
        <span style={leafStyles.title}>{data.title}</span>
      </div>
    case 'rawText':
      return <TextField
        hintText='Go Type!'
        multiLine
        rows={5}
        style={leafStyles.textFieldStyles}
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
    default:
      return [
        {
          iconName: 'bookmark',
          onClick: { isEmphasized: !data.isEmphasized },
          style: (data) => {
            console.log('style funciton')
            if (data.isEmphasized) return { color: '#4CAF50' }
            return
          }
        },
        {
          iconName: 'share',
          onClick: function () {}
        },
        {
          iconName: 'delete',
          onClick: { delete: true }
        }
      ]
  }
}
