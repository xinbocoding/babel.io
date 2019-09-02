import { Actions } from '../actions/snippetIndexPageActions';

const initialState = {
  currentPage: 1,
  snippetsByPage: [[]]
};
/**
 * Current user's snippets.
 */
export default function snippetIndexPageReducer(state = initialState, action) {
  switch (action.type) {
    case Actions.LOAD_SNIPPETS_COMPLETE:
      return {
        ...state,
        snippetsByPage: [...state.snippetsByPage, action.payload.snippets]
      };
    case Actions.DELETE_SNIPPET_COMPLETE:
      return {
        ...state,
        snippetsByPage: state.snippetsByPage
          .slice(0, action.payload.page)
          .concat(
            state.snippetsByPage[action.payload.page].filter(
              m => m.id !== action.payload.id
            )
          )
      };
    default:
      return {
        ...state
      };
  }
}
