import { Actions } from '../actions/snippetIndexPageActions';

const initialState = {
  snippetsByPage: [],
  lastVisibleByPage: []
};
/**
 * Current user's snippets.
 */
export default function snippetIndexPageReducer(state = initialState, action) {
  switch (action.type) {
    case Actions.LOAD_SNIPPETS_COMPLETE:
      return {
        ...state,
        snippetsByPage: [...state.snippetsByPage, action.payload.snippets],
        lastVisibleByPage: [
          ...state.lastVisibleByPage,
          action.payload.lastVisible
        ]
      };
    default:
      return {
        ...state
      };
  }
}
