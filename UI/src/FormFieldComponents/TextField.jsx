import React from 'react';
import Form from 'react-bootstrap/Form';
import "bootstrap/dist/css/bootstrap.min.css";

export default class TextField extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: props.value };
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ value: e.target.value });
  }

  onBlur(e) {
    const { onChange } = this.props;
    const { value } = this.state;
    onChange(e, value);
  }

  render() {
    const { value } = this.state;
    return (
      <Form.Control
        type="text"
        {...this.props}
        value={value}
        onBlur={this.onBlur}
        onChange={this.onChange}
      />
    );
  }
}
