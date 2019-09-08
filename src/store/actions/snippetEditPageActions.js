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

export function updateSnippetAction(id, { snippet, marks, deletedMarks }, cb) {
  return dispatch => {
    snippetService
      .update(id, snippet, marks, deletedMarks)
      .then(() => {
        dispatch({
          type: Actions.UPDATE_SNIPPET_COMPLETE
        });
        cb();
      })
      .catch(error => {
        console.log(error);
      });
  };
}
