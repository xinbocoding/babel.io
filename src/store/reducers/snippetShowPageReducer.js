import { Actions } from '../actions/snippetShowPageActions';

export default function snippetShowPageReducer(state = {}, action) {
  switch (action.type) {
    case Actions.LOAD_SNIPPET_COMPLETE:
      return {
        ...state,
        snippet: action.payload.snippet,
        marks: action.payload.marks
      };
    default:
      return { ...state };
  }
}
