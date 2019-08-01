import { Actions } from '../actions/snippetEditPageActions';

export default function snippetEditPageReducer(state = {}, action) {
  switch (action.type) {
    case Actions.LOAD_SNIPPET_COMPLETE:
    case Actions.UPDATE_SNIPPET_COMPLETE:
      return {
        ...state,
        snippet: action.payload.snippet
      };
    case Actions.UPDATE_SNIPPET_ERROR:
    case Actions.LOAD_SNIPPET_ERROR:
      return {
        ...state,
        error: action.payload.error
      };
    default:
      return { ...state };
  }
}
