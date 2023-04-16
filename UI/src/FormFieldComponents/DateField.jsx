import React from 'react';
import Form from 'react-bootstrap/Form';
import "bootstrap/dist/css/bootstrap.min.css";

function displayFormat(date) {
  return date != null ? date.split('T')[0] : '';
}

function editFormat(date) {
  return date != null ? date.substr(0, 10) : '';
}

function unformat(str) {
  const val = new Date(str);
  return Number.isNaN(val.getTime()) ? null : val;
}

export default class DateField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: editFormat(props.value),
      focused: false,
      valid: true,
    };
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onFocus() {
    this.setState({ focused: true });
  }

  onBlur(e) {
    const { value, valid: oldValid } = this.state;
    const { onValidityChange, onChange } = this.props;
    const dateValue = unformat(value);
    const valid = value === '' || dateValue != null;
    if (valid !== oldValid && onValidityChange) {
      onValidityChange(e, valid);
    }
    this.setState({ focused: false, valid });
    if (valid) onChange(e, dateValue);
  }

  onChange(e) {
    if (e.target.value.match(/^[\d-]*$/)) {
      this.setState({ value: e.target.value });
    }
  }

  render() {
    const { valid, focused, value } = this.state;
    const { value: origValue, onValidityChange, ...props } = this.props;
    const displayValue = focused || !valid ? value : displayFormat(origValue);
    return (
      <Form.Control
        {...props}
        type="text"
        size="20"
        value={displayValue}
        placeholder={focused ? 'yyyy-mm-dd' : null}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onChange={this.onChange}
      />
    );
  }
}
