import React from 'react';
import { PropTypes } from 'prop-types';

const CodeToolbar = ({ buttons, onAction }) => {
  return (
    <div className="form-row">
      <div className="col-md-8 col-sm-6">
        <div className="btn-group" role="group">
          {buttons.map(({ action, icon }) => {
            return (
              <button
                key={action}
                type="button"
                className="btn btn-light"
                onClick={() => onAction(action)}
              >
                <i className={`fal fa-${icon}`} />
              </button>
            );
          })}
        </div>
      </div>
      <div className="col-md-4 col-sm-6">
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              Language
            </span>
          </div>
          <select className="custom-select" defaultValue="javascript">
            <option type="text" value="javascript">
              JavaScript
            </option>
          </select>
        </div>
      </div>
    </div>
  );
};

CodeToolbar.propTypes = {
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      action: PropTypes.string,
      icon: PropTypes.string
    })
  ).isRequired,
  onAction: PropTypes.func.isRequired
};

export default CodeToolbar;
