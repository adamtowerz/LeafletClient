import update from 'react-addons-update'
import axios from 'axios'

// ------------------------------------
// Constants
// ------------------------------------
export const SET_FILTER_TYPE = 'SET_FILTER_TYPE'
export const SET_SELECTED_LEAFLET = 'SET_SELECTED_LEAFLET'
export const SET_DASHBOARD_CONTENT = 'SET_DASHBOARD_CONTENT'
export const SET_DASHBOARD_NAV = 'SET_DASHBOARD_NAV'

// ------------------------------------
// Actions
// ------------------------------------
export function setFilterType (value = 'All Leaflets') {
  return {
    type    : SET_FILTER_TYPE,
    payload : value
  }
}

export function setSelectedLeaflet (value = '') {
  return {
    type    : SET_SELECTED_LEAFLET,
    payload : value
  }
}

export function setDashboardContent (value = {}) {
  return {
    type: SET_DASHBOARD_CONTENT,
    payload: value
  }
}

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

export const actions = {
  SET_FILTER_TYPE,
  SET_SELECTED_LEAFLET
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
  [SET_SELECTED_LEAFLET] : (state, action) => {
    return update(state, {
      selectedLeaflet: {
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
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  filterType: 'All Leaflets',
  selectedLeaflet: '',
  dashboardContent: []
}
export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
