import React from 'react';
import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.min.css";

export default class ButtonField extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: props.value };
  }

  render() {
    const { value } = this.state;
    return <Button type="button" {...this.props} value={value}>{value}</Button>;
  }
}
