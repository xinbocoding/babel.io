/* eslint-disable import/prefer-default-export */
import PropTypes from 'prop-types';

export const HighlightMarkShape = PropTypes.shape({
  type: PropTypes.string,
  from: PropTypes.number,
  to: PropTypes.number
});

export const MarkShape = PropTypes.oneOfType([HighlightMarkShape]);

export const MarkListShap = PropTypes.arrayOf(MarkShape);

export const SnippetShape = PropTypes.shape({
  title: PropTypes.string,
  mode: PropTypes.string,
  code: PropTypes.string,
  note: PropTypes.string
});

export const SnippetListShape = PropTypes.arrayOf(SnippetShape);

export const AuthShape = PropTypes.shape({
  user: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string
  })
});
