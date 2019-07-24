import { combineReducers } from 'redux';

// state.currentUser
function authReducer(state = {}, action) {
  switch (action.type) {
    case 'AUTH_STATE_CHANGED':
      return { user: action.data.user };
    default:
      return { ...state };
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
      };
    case 'USER_SNIPPETS_REQUEST_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        items: action.data.snippets
      };
    case 'USER_SNIPPETS_REQUEST_ERROR':
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    default:
      return { ...state }
  }
}

function lastCreatedSnippetReducer(state = {}, action) {
  switch (action.type) {
    case 'CREATE_SNIPPET_SUCCESS':
      return {
        id: action.data.id
      };
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
      };
    default:
      return {
        snippet: undefined
      }
  }
}

let reducerMap = {
  snippetDetailPage: snippetDetailPageReducer,
  auth: authReducer,
  userSnippets: userSnippetsReducer,
  lastCreatedSnippet: lastCreatedSnippetReducer
};

const combinedReducers = combineReducers(reducerMap);

export default combinedReducers;
