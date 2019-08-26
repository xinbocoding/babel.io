/* eslint-disable import/prefer-default-export */
import PropTypes from 'prop-types';

export const MarkPosShape = PropTypes.shape({
  ch: PropTypes.number,
  line: PropTypes.number
});

export const MarkShape = PropTypes.shape({
  type: PropTypes.string,
  from: MarkPosShape,
  to: MarkPosShape
});

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
