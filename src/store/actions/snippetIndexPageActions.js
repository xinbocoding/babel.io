import { snippetService } from '../../services';

const PREFIX = 'page:snippets-index';

export const Actions = {
  LOAD_SNIPPETS_COMPLETE: `${PREFIX}:load-snippet-complete`
};

export function fetchSnippetsAction(userId) {
  return dispatch => {
    snippetService
      .findAllByUserId(userId)
      .then(snippets => {
        dispatch({
          type: Actions.LOAD_SNIPPETS_COMPLETE,
          payload: {
            snippets
          }
        });
      })
      .catch(console.log);
  };
}
