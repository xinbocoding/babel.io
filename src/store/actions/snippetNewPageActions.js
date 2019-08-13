import { snippetService } from '../../services';

const PREFIX = 'page:snippet-edit';

export const Actions = {
  CREATE_SNIPPET_SUCCESS: `${PREFIX}:create-snippet-success`,
  CREATE_SNIPPET_ERROR: `${PREFIX}:create-snippet-error`
};

export function createSnippetAction(snippet, marks, callback) {
  return dispatch => {
    snippetService
      .create(snippet, marks)
      .then(snippetId => {
        dispatch({
          type: Actions.CREATE_SNIPPET_SUCCESS,
          payload: {
            id: snippetId
          }
        })
      })
      .catch(error => {
        dispatch({
          type: Actions.CREATE_SNIPPET_ERROR,
          payload: {
            error
          }
        });
      });
  };
}
