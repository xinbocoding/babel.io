/* eslint-disable import/prefer-default-export */
import PropTypes from 'prop-types';

export const SnippetShape = PropTypes.shape({
  mode: PropTypes.string,
  code: PropTypes.string,
  marks: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string
    })
  )
});

export const AuthShape = PropTypes.shape({ id: PropTypes.string });
