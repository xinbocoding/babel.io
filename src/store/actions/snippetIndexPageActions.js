import { snippetService } from '../../services';

const PREFIX = 'page:snippets-index';

export const Actions = {
  LOAD_SNIPPETS_COMPLETE: `${PREFIX}:load-snippet-complete`
};

export function fetchSnippetsAction(userId, startAfter = 0) {
  return dispatch => {
    snippetService
      .findAllByUserId(userId, startAfter)
      .then(({ snippets, lastVisible }) => {
        dispatch({
          type: Actions.LOAD_SNIPPETS_COMPLETE,
          payload: {
            snippets,
            lastVisible
          }
        });
      })
      .catch(console.log);
  };
}
