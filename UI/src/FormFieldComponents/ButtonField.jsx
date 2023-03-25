import React from 'react';

export default class ButtonField extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: props.value };
  }

  render() {
    const { value } = this.state;
    return <input type="button" {...this.props} value={value} />;
  }
}
