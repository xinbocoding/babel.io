import React from 'react';
import { PropTypes } from 'prop-types';
import Select from 'react-select';
import {
  langDropdownOptions,
  getSelectedDropdownOption
} from '../../data/modes';
import { ToolbarButtonListShape } from '../../data/shapes';

const CodeToolbar = ({ lang, buttons, onAction, onLangChange }) => {
  const selected = getSelectedDropdownOption(lang);
  return (
    <div className="form-row mb-2">
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
        <Select
          defaultValue={selected}
          onChange={option => onLangChange(option.value)}
          options={langDropdownOptions}
        />
      </div>
    </div>
  );
};

CodeToolbar.propTypes = {
  lang: PropTypes.string.isRequired,
  onLangChange: PropTypes.func.isRequired,
  buttons: ToolbarButtonListShape.isRequired,
  onAction: PropTypes.func.isRequired
};

export default CodeToolbar;
