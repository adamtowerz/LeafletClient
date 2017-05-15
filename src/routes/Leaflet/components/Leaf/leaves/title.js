import React from 'react'

export default {
  template: (data, styles, update, meta) => (<div style={styles.titleCardBox}>
    <span style={styles.title}>{meta.title}</span>
  </div>),
  styles: (data) => ({
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
    } }),
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
  })
}
