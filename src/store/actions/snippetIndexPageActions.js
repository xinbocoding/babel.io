import { snippetService } from '../../services';

const PREFIX = 'page:snippets-index';

export const Actions = {
  LOAD_SNIPPETS_COMPLETE: `${PREFIX}:load-snippet-complete`,
  DELETE_SNIPPET_COMPLETE: `${PREFIX}:delete-snippet-complete`
};

export function loadSnippetPageAction(userId, page, lastVisible = 0) {
  return dispatch => {
    snippetService
      .findAllByUserId(userId, lastVisible)
      .then(({ snippets }) => {
        dispatch({
          type: Actions.LOAD_SNIPPETS_COMPLETE,
          payload: {
            page,
            snippets
          }
        });
      })
      .catch(console.log);
  };
}

export function deleteSnippetAction(id, page) {
  return dispatch => {
    snippetService
      .delete(id)
      .then(() => {
        dispatch({
          type: Actions.DELETE_SNIPPET_COMPLETE,
          payload: {
            page,
            id
          }
        });
      })
      .catch(console.log);
  };
}
