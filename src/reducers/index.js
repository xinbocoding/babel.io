import { combineReducers } from 'redux';

// state.currentUser
function currentUserReducer(state = {}, action) {
  switch (action.type) {
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
  switch (action.type) {
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

function lastCreatedSnippetReducer(state = {}, action) {
  switch (action.type) {
    case 'CREATE_SNIPPET_SUCCESS':
      return {
        id: action.data.id
      }
    default:
      return {
        id: undefined
      }
  }
}

function snippetDetailPageReducer(state = {}, action) {
  switch (action.type) {
    case 'LOAD_SNIPPET_SUCCESS':
      return {
        ...state,
        snippet: action.data.snippet
      }
    default:
      return {
        snippet: undefined
      }
  }
}

let reducerMap = {
  snippetDetailPage: snippetDetailPageReducer,
  currentUser: currentUserReducer,
  userSnippets: userSnippetsReducer,
  lastCreatedSnippet: lastCreatedSnippetReducer
}

const combinedReducers = combineReducers(reducerMap)

export default combinedReducers;
