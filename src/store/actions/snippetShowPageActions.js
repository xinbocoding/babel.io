import { snippetService } from '../../services';

const PREFIX = 'page:snippet-show';

export const Actions = {
  LOAD_SNIPPET_COMPLETE: `${PREFIX}:load-snippet-complete`,
  LOAD_SNIPPET_ERROR: `${PREFIX}:load-snippet-error`
};

export function loadSnippetByIdAction(id) {
  return dispatch => {
    snippetService
      .findById(id, true)
      .then(({ snippet, marks }) => {
        dispatch({
          type: Actions.LOAD_SNIPPET_COMPLETE,
          payload: {
            snippet,
            marks
          }
        });
      })
      .catch(console.log);
  };
}
