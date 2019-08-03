import { snippetService } from '../../services';

const PREFIX = 'page:snippet-edit';

export const Actions = {
  CREATE_SNIPPET_ERROR: `${PREFIX}:create-snippet-error`
};

export function createSnippetAction(snippet, history) {
  return dispatch => {
    snippetService
      .create(snippet)
      .then(snippetId => history.push(`/snippets/${snippetId}`))
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
