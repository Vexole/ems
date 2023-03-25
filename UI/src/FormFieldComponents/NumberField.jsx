import React from 'react';

export default class NumberField extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: props.value };
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    if (e.target.value.match(/^\d*$/)) {
      this.setState({ value: e.target.value });
    }
  }

  onBlur(e) {
    const { onChange } = this.props;
    const { value } = this.state;
    onChange(e, value);
  }

  render() {
    const { value } = this.state;
    return (
      <input
        type="number"
        {...this.props}
        value={value}
        onBlur={this.onBlur}
        onChange={this.onChange}
      />
    );
  }
}
