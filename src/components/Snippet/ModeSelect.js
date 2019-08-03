import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';
import { ModeList } from '../../utils/modes';

class ModeSelect extends React.Component {
  constructor(props) {
    super(props);

    const { value } = props;
    this.state = {
      value
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    const { onChange } = this.props;

    this.setState({ value: e.target.value });
    onChange(e.target.value);
  }

  render() {
    const { value } = this.state;
    return (
      <Select
        value={value}
        onChange={this.handleChange}
        inputProps={{ name: 'mode' }}
      >
        {ModeList.map(m => {
          return (
            <MenuItem value={m.key} key={m.key}>
              {m.label}
            </MenuItem>
          );
        })}
      </Select>
    );
  }
}

ModeSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string
};

ModeSelect.defaultProps = {
  value: 'javascript'
};

export default ModeSelect;
