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
      return { ...state };
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
      };
  }
}

function snippetEditPageReducer(state = {}, action) {
  switch (action.type) {
    case 'SNIPPET_EDIT_LOAD_START':
      return {
        snippet: null,
      }
    case 'SNIPPET_EDIT_LOAD_SUCCESS':
      return {
        snippet: action.data.snippet,
      }
    case 'SNIPPET_EDIT_LOAD_ERROR':
      return {
        snippet: null,
      }
    default:
      return { ...state };
  }
}

function snippetSnapshotsReducer(state = {}, action) {
  switch (action.type) {
    case 'SNIPPET_SNAPSHOT_LOADED':
      const { id, snippet } = action.payload;
      return { ...state, ...{ [id]: snippet } }
    default:
      return { ...state }
  }
}

const reducerMap = {
  snippetSnapshots: snippetSnapshotsReducer,
  snippetDetailPage: snippetDetailPageReducer,
  snippetEditPage: snippetEditPageReducer,
  auth: authReducer,
  userSnippets: userSnippetsReducer
};

const combinedReducers = combineReducers(reducerMap);

export default combinedReducers;
