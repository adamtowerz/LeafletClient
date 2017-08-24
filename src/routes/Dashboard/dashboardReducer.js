import update from 'react-addons-update'
import axios from 'axios'

// ------------------------------------
// Constants
// ------------------------------------
export const SET_FILTER_TYPE = 'SET_FILTER_TYPE'
export const SET_DASHBOARD_CONTENT = 'SET_DASHBOARD_CONTENT'
export const SET_DASHBOARD_NAV = 'SET_DASHBOARD_NAV'
export const SELECT_NOTEBOOK = 'SELECT_NOTEBOOK'
export const UPDATE_SELECTED_NOTEBOOK = 'UPDATE_SELECTED_NOTEBOOK'

// ------------------------------------
// Actions
// ------------------------------------
export function setFilterType (value = 'All Leaflets') {
  return {
    type    : SET_FILTER_TYPE,
    payload : value
  }
}

export function setDashboardContent (value = {}) {
  return {
    type: SET_DASHBOARD_CONTENT,
    payload: value
  }
}

/*
export function selectNotebook (username, title) {
  return {
    type    : SELECT_NOTEBOOK,
    username : username,
    title: title
  }
}
*/

export const fetchDashboardNavData = () => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      axios.post('/graphql', {
        query: `
          {
            profiles(id: 0) {
              notebooks {
                title
                color
              }
            }
          }
           `
      }).then(response => {
        dispatch({
          type    : SET_DASHBOARD_NAV,
          payload : response.data.data
        })
        resolve()
      })
    })
  }
}

export const fetchDashboardInfoData = (username, title) => {
  console.log('fetch data')
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      axios.post('/graphql', {
        query: `
          {
            profile(username: "${username}") {
              notebook(title: "${title}") {
                title
                author {
                  username
                }
                lastEdit {
                  who
                  when
                }
                sections {
                  title
                  leaflets {
                    title
                    leaves {
                      leafID
                      leafData
                      leafType
                    }
                  }
                }
              }
            }
          }
           `
      }).then(response => {
        dispatch({
          type    : SELECT_NOTEBOOK,
          payload : response.data.data
        })
        resolve()
      })
    })
  }
}

import LOAD_NOTEBOOK from '../Notebook/notebookReducer'
export const openNotebook = (username, title) => {
  console.log('open')
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      axios.post('/graphql', {
        query: `
          {
            profile(username: "${username}") {
              notebook(title: "${title}") {
                title
                author {
                  username
                }
                sections {
                  title
                  leaflets {
                    title
                  }
                }
              }
            }
          }
           `
      }).then(response => {
        // TODO nav to /leaflet
        console.log(response)
        dispatch({
          type    : 'LOAD_NOTEBOOK',
          payload : response.data.data.profile.notebook
        })
        resolve()
      })
    })
  }
}

export const actions = {
  SET_FILTER_TYPE
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_FILTER_TYPE] : (state, action) => {
    return update(state, {
      filterType: {
        $set: action.payload
      }
    })
  },
  [SET_DASHBOARD_CONTENT] : (state, action) => {
    return update(state, {
      dashboardContent: {
        $set: action.payload
      }
    })
  },
  [SET_DASHBOARD_NAV] : (state, action) => {
    return update(state, {
      dashboardNav: {
        $set: action.payload
      }
    })
  },
  [SELECT_NOTEBOOK] : (state, action) => {
    return update(state, {
      selectedNotebook: {
        $set: action.payload.profile.notebook
      }
    })
  }
  /*
  [UPDATE_SELECTED_NOTEBOOK] : (state, action) => {
    console.log(state.dashboard.selectedNotebook)
    console.log(action.payload)
    console.log({ ...state.dashboard.selectedNotebook, ...action.payload })
    return update(state, {
      selectedNotebook: {
        $set: { ...state.dashboard.selectedNotebook, ...action.payload }
      }
    })
  }
  */
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  filterType: 'All Leaflets',
  dashboardContent: [],
  selectedNotebook: {}
}
export default function dashboardReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
