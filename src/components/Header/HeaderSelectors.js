import { createSelector } from 'reselect'

export const headerSelector = (state) => {
  return state.header
}

export const openDrawerSelector = createSelector(headerSelector, (header) => {
  return header ? header.openDrawer : false
})
