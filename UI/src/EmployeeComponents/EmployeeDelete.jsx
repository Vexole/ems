import React from 'react';
import { withRouter } from 'react-router-dom';
import graphQLFetch from '../js/graphqlAPI';
import {
  deleteEmployeeByIdQuery,
  employeeByIdQuery,
} from '../js/graphqlQueries';
import NumberField from '../FormFieldComponents/NumberField.jsx';
import TextField from '../FormFieldComponents/TextField.jsx';
import ButtonField from '../FormFieldComponents/ButtonField.jsx';
import SelectField from '../FormFieldComponents/SelectField.jsx';
import DateField from '../FormFieldComponents/DateField.jsx';
import {
  titleOptions,
  departmentOptions,
  employeeTypeOptions,
  statusOptions,
} from '../js/selectOptions';
import CustomToast from '../Utils/Toast.jsx';
import Form from 'react-bootstrap/Form';
import "bootstrap/dist/css/bootstrap.min.css";

class EmployeeDelete extends React.Component {
  constructor() {
    super();
    this.state = { employee: {}, toastMessage: '', toastVariant: '', showToast: false };
    this.deleteEmployee = this.deleteEmployee.bind(this);
    this.displayToast = this.displayToast.bind(this);
  }

  componentDidMount() {
    {
      /* Get the id from the URL and it's get details */
    }
    const { id } = this.props.match.params;
    if (id) {
      this.getEmployeeById(id);
    }
  }

  async deleteEmployee() {
    {
      /* Make an API call to delete the selected employee, and redirect to the employess list screen */
    }

    if (this.state.employee.status === 1) {
      this.setState({toastMessage: "Can't delete employee - Status Active.", toastVariant: 'danger'});
      this.displayToast();
      return;
    }

    const data = await graphQLFetch(deleteEmployeeByIdQuery, {
      employeeId: this.props.match.params.id,
    });

    if (data.deleteEmployee) {
      this.setState({toastMessage: "Employee deleted successfully.", toastVariant: 'success'});
      this.displayToast();
      const { history } = this.props;
      history.push({
        pathname: '/employees',
        search: '',
      });
    } else {
      this.setState({toastMessage: "Can't delete employee - Status Active.", toastVariant: 'danger'});
      this.displayToast();
      return;
    }
  }

  async getEmployeeById(employeeId) {
    {
      /* Fetch employee based on the employee id provided */
    }
    const vars = { employeeId };
    const data = await graphQLFetch(employeeByIdQuery, vars);
    if (data) {
      this.setState({
        employee: data.employeeById,
      });
    }
  }

  displayToast() {
    this.setState({ showToast: true });
    setTimeout(() => {
      this.setState({ showToast: false });
    }, 3000);
  }

  render() {
    const {
      _id,
      firstName,
      lastName,
      age,
      dateOfJoining,
      employeeType,
      title,
      department,
      status,
    } = this.state.employee;

    const { showToast, toastMessage, toastVariant } = this.state;

    return (
      <section id="add-employee-container">
        {showToast && (<CustomToast message={toastMessage} variant={toastVariant}/>)}
        <h1 className="section-header">
          Employee Details: {firstName} {lastName}
        </h1>
        <Form name="updateEmployee" className="add-employee-form">
          <input type="hidden" name="_id" value={_id || ''} />

          <Form.Label htmlFor="firstName">First Name</Form.Label>
          {firstName && (
            <TextField disabled="disabled" name="firstName" value={firstName} />
          )}
          <span></span>

          <Form.Label htmlFor="lastName">Last Name</Form.Label>
          {lastName && (
            <TextField disabled="disabled" name="lastName" value={lastName} />
          )}
          <span></span>

          <Form.Label htmlFor="age">Age</Form.Label>
          {age && (
            <NumberField disabled="disabled" name="age" defaultValue={age} />
          )}
          <span></span>

          <Form.Label htmlFor="dateOfJoining">Date of Joining</Form.Label>
          {dateOfJoining && (
            <DateField
              name="dateOfJoining"
              id="dateOfJoining"
              value={dateOfJoining}
              disabled="disabled"
            />
          )}
          <span></span>

          <Form.Label htmlFor="title">Title</Form.Label>
          <SelectField
            value={title}
            disabled="disabled"
            name="title"
            options={titleOptions}
          />
          <span></span>

          <Form.Label htmlFor="department">Department</Form.Label>
          <SelectField
            value={department}
            disabled="disabled"
            name="department"
            options={departmentOptions}
          />
          <span></span>

          <Form.Label htmlFor="employeeType">Employee Type</Form.Label>
          <SelectField
            value={employeeType}
            disabled="disabled"
            name="employeeType"
            options={employeeTypeOptions}
          />
          <span></span>

          <Form.Label htmlFor="status">Status</Form.Label>
          <SelectField
            value={status == 0 ? 'Retired' : 'Working'}
            disabled="disabled"
            name="status"
            options={statusOptions}
          />
          <span></span>

          <ButtonField
            value="Delete"
            className="delete-employee-btn col-md-6"
            onClick={this.deleteEmployee}
          />
        </Form>
      </section>
    );
  }
}

export default withRouter(EmployeeDelete);
