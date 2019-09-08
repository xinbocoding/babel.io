import { Actions } from '../actions/snippetEditPageActions';

export default function snippetEditPageReducer(state = {}, action) {
  switch (action.type) {
    case Actions.LOAD_SNIPPET_COMPLETE:
      return {
        ...state,
        snippet: action.payload.snippet,
        marks: action.payload.marks
      };
    case Actions.UPDATE_SNIPPET_COMPLETE:
      return {
        ...state,
        snippet: null,
        marks: null
      };
    case Actions.LOAD_SNIPPET_ERROR:
      return {
        ...state,
        error: action.payload.error
      };
    default:
      return { ...state };
  }
}
