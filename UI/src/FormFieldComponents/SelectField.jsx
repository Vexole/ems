import React from 'react';
import Form from 'react-bootstrap/Form';
import "bootstrap/dist/css/bootstrap.min.css";

export default class SelectField extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: props.value };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    const { value } = this.state;
    const options = this.props.options.map((option) => {
      return <option key={option.value} value={option.value}>{option.label}</option>;
    });

    return (
      <Form.Select value={value} onChange={this.onChange} {...this.props}>
        {options}
      </Form.Select>
    );
  }
}
