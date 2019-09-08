import { snippetService } from '../../services';
import { getUserInfoAction } from './userActions';

const PREFIX = 'page:snippet-show';

export const Actions = {
  LOAD_SNIPPET_COMPLETE: `${PREFIX}:load-snippet-complete`,
  LOAD_SNIPPET_ERROR: `${PREFIX}:load-snippet-error`
};

export function loadSnippetByIdAction(id) {
  return dispatch => {
    snippetService
      .findById(id)
      .then(({ snippet, marks }) => {
        dispatch({
          type: Actions.LOAD_SNIPPET_COMPLETE,
          payload: {
            snippet,
            marks
          }
        });
        dispatch(getUserInfoAction(snippet.userId));
      })
      .catch(console.log);
  };
}
