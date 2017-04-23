import { createSelector } from 'reselect'
export const leafletSelector = state => state.leaflet
export const sectionsSelector = (state) => leafletSelector(state).sections
export const activePageSelector = (state) => leafletSelector(state).activePage

export const pageSelector = createSelector(activePageSelector, sectionsSelector,
  (activePage, sections) => activePage ? sections[activePage[0]].pages[activePage[1]] : false)

export const leavesSelector = createSelector(pageSelector, (page) => page ? page.leaves : [])

export const leafSelector = createSelector(leavesSelector, (_, props) => props,
  (leaves, props) => {
    return leaves.map((leaf) => {
      if (leaf.leafID === props) {
        return leaf
      }
    })
  })

export const leafTypeSelector = createSelector(leafSelector, (leaf) => {
  return leaf[0].leafType
})
export const leafDataSelector = createSelector(leafSelector, (leaf) => {
  return leaf[0].leafData
})
