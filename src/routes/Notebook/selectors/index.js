import { createSelector } from 'reselect'
export const notebookSelector = (state) => {
  return state.notebook
}
export const sectionsSelector = (state) => state.notebook.sections
export const activeLeafletSelector = (state) => state.notebook.activeLeaflet

export const leafletSelector = createSelector(activeLeafletSelector, sectionsSelector,
  (activeLeaflet, sections) => {
    return activeLeaflet ? sections[activeLeaflet[0]].leaflets[activeLeaflet[1]] : false
  })

export const leafletMetaSelector = createSelector(leafletSelector, (leaflet) => ({
  isFavorited: leaflet.isFavorited,
  title: leaflet.title
}))

export const leavesSelector = createSelector(leafletSelector, (leaflet) => {
  return leaflet ? leaflet.leaves : []
})

export const leafID = (_, props) => props

export const leafSelector = createSelector(leavesSelector, leafID,
  (leaves, ID) => {
    let ret
    leaves.map((leaf) => {
      if (leaf.leafID === ID) {
        ret = leaf
      }
    })
    return ret
  })

export const leafTypeSelector = createSelector(leafSelector, (leaf) => {
  return leaf.leafType
})

export const leafDataSelector = createSelector(leafSelector, (leaf) => {
  return leaf.leafData
})
