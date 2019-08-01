import { Actions } from '../actions/snippetIndexPageActions';

/**
 * Current user's snippets.
 */
export default function snippetIndexPageReducer(state = [], action) {
  switch (action.type) {
    case Actions.LOAD_SNIPPETS_COMPLETE:
      return {
        ...state,
        snippets: action.payload.snippets
      };
    default:
      return {
        ...state
      };
  }
}
