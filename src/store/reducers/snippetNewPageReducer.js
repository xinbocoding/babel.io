import { Actions } from '../actions/snippetNewPageActions';

export default function snippetNewPageReducer(state = {}, action) {
  switch (action.type) {
    case Actions.CREATE_SNIPPET_ERROR:
      return {
        error: action.payload.error
      };
    default:
      return { ...state };
  }
}
