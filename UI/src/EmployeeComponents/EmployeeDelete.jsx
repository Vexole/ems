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

class EmployeeDelete extends React.Component {
  constructor() {
    super();
    this.state = { employee: {} };
    this.deleteEmployee = this.deleteEmployee.bind(this);
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
      alert("CAN'T DELETE EMPLOYEE - STATUS ACTIVE");
      return;
    }

    const data = await graphQLFetch(deleteEmployeeByIdQuery, {
      employeeId: this.props.match.params.id,
    });

    if (data.deleteEmployee) {
      alert('Employee Deleted');
      const { history } = this.props;
      history.push({
        pathname: '/employees',
        search: '',
      });
    } else {
      alert("CAN'T DELETE EMPLOYEE - STATUS ACTIVE");
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

    return (
      <section id="add-employee-container">
        <h1 className="section-header">
          Employee Details: {firstName} {lastName}
        </h1>
        <form name="updateEmployee" className="add-employee-form">
          <input type="hidden" name="_id" value={_id || ''} />

          <label htmlFor="firstName">First Name</label>
          {firstName && (
            <TextField disabled="disabled" name="firstName" value={firstName} />
          )}
          <span></span>

          <label htmlFor="lastName">Last Name</label>
          {lastName && (
            <TextField disabled="disabled" name="lastName" value={lastName} />
          )}
          <span></span>

          <label htmlFor="age">Age</label>
          {age && (
            <NumberField disabled="disabled" name="age" defaultValue={age} />
          )}
          <span></span>

          <label htmlFor="dateOfJoining">Date of Joining</label>
          {dateOfJoining && (
            <DateField
              name="dateOfJoining"
              id="dateOfJoining"
              value={dateOfJoining}
              disabled="disabled"
            />
          )}
          <span></span>

          <label htmlFor="title">Title</label>
          <SelectField
            value={title}
            disabled="disabled"
            name="title"
            options={titleOptions}
          />
          <span></span>

          <label htmlFor="department">Department</label>
          <SelectField
            value={department}
            disabled="disabled"
            name="department"
            options={departmentOptions}
          />
          <span></span>

          <label htmlFor="employeeType">Employee Type</label>
          <SelectField
            value={employeeType}
            disabled="disabled"
            name="employeeType"
            options={employeeTypeOptions}
          />
          <span></span>

          <label htmlFor="status">Status</label>
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
        </form>
      </section>
    );
  }
}

export default withRouter(EmployeeDelete);
