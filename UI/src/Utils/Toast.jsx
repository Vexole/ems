import React from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import "bootstrap/dist/css/bootstrap.min.css";

export default class CustomToast extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { message, variant } = this.props;
    return (
      <div
      aria-live="polite"
      aria-atomic="true"
      className="position-relative"
      style={{ height: '60px' }}
      >
        <ToastContainer position="top-center">
          <Toast bg={variant} className='text-white text-center'>
            <Toast.Body>{message}</Toast.Body>
          </Toast>
        </ToastContainer>
      </div>
    );
  }
}
