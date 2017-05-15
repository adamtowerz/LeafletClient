import React from 'react'
import TextField from 'material-ui/TextField'

export default {
  template: (data, styles, update, meta) => (<TextField
    value={data.value}
    hintText='Go Type!'
    multiLine
    rows={5}
    style={styles.textFieldStyles}
    onChange={(e, nv) => {
      update({ value: nv })
    }}
  />),
  styles: (data) => ({
    textFieldStyles: {
      width: '100%'
    }
  }),
  actions: (data) => ({
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
  })
}
