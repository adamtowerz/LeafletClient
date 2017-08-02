import { createSelector } from 'reselect'
export const leafletSelector = (state) => {
  return state.leaflet
}
export const sectionsSelector = (state) => state.leaflet.sections
export const activePageSelector = (state) => state.leaflet.activePage

export const pageSelector = createSelector(activePageSelector, sectionsSelector,
  (activePage, sections) => {
    return activePage ? sections[activePage[0]].pages[activePage[1]] : false
  })

export const pageMetaSelector = createSelector(pageSelector, (page) => ({
  isFavorited: page.isFavorited,
  title: page.title
}))

export const leavesSelector = createSelector(pageSelector, (page) => {
  return page ? page.leaves : []
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
