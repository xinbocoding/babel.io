import { combineReducers } from 'redux';

// state.currentUser
function currentUserReducer(state = {}, action) {
  switch(action.type) {
    case 'SIGN_IN_SUCCESS':
      return {
        ...action.data,
        isSignedIn: true
      }
    case 'SIGN_IN_FAILED':
    case 'SIGN_OUT_SUCCESS':
    case 'SIGN_OUT_FAILED':
    default:
      return {
        name: 'Guest',
        isSignedIn: false
      }
  }
}

// state.publicSnippets
function userSnippetsReducer(state = {}, action) {
  switch(action.type) {
    case 'USER_SNIPPETS_REQUEST_START':
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    case 'USER_SNIPPETS_REQUEST_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        items: action.data.snippets
      }
    case 'USER_SNIPPETS_REQUEST_ERROR':
      return {
        ...state,
        isLoading: false,
        isError: true
      }
    default:
      return {
        isLoading: false,
        isError: false,
        items: []
      }
  }
}

let reducerMap = {
  currentUser: currentUserReducer,
  userSnippets: userSnippetsReducer,
}

const combinedReducers = combineReducers(reducerMap)

export default combinedReducers;
