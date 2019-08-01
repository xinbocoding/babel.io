import { snippetService } from '../../services';

const PREFIX = 'page:snippet-edit';

export const Actions = {
  CREATE_SNIPPET_ERROR: `${PREFIX}:create-snippet-error`
};

export function createSnippetAction(data, history) {
  return dispatch => {
    snippetService
      .create(data)
      .then(id => history.push(`/snippets/${id}`))
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
