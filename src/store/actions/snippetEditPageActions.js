import { snippetService } from '../../services';

const PREFIX = 'page:snippet-edit';

export const Actions = {
  LOAD_SNIPPET_COMPLETE: `${PREFIX}:load-snippet-complete`,
  LOAD_SNIPPET_ERROR: `${PREFIX}:load-snippet-error`,
  UPDATE_SNIPPET_COMPLETE: `${PREFIX}:update-snippet-complete`,
  UPDATE_SNIPPET_ERROR: `${PREFIX}:update-snippet-error`
};

export function loadSnippetForEditAction(id) {
  return dispatch => {
    snippetService
      .findById(id)
      .then(snippet => {
        dispatch({
          type: Actions.LOAD_SNIPPET_COMPLETE,
          payload: {
            snippet
          }
        });
      })
      .catch(error => {
        dispatch({
          type: Actions.LOAD_SNIPPET_ERROR,
          payload: {
            error
          }
        });
      });
  };
}

export function updateSnippetAction(id, data, history) {
  return dispatch => {
    snippetService
      .update(id, data)
      .then(() => history.push(`/snippets/${id}`))
      .catch(error => {
        dispatch({
          type: Actions.UPDATE_SNIPPET_ERROR,
          payload: {
            error
          }
        });
      });
  };
}
