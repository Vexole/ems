import React from 'react';
import graphQLFetch from '../js/graphqlAPI';
import { employeeByIdQuery } from '../js/graphqlQueries';
import NumberField from '../FormFieldComponents/NumberField.jsx';
import TextField from '../FormFieldComponents/TextField.jsx';
import SelectField from '../FormFieldComponents/SelectField.jsx';
import DateField from '../FormFieldComponents/DateField.jsx';
import {
  titleOptions,
  departmentOptions,
  employeeTypeOptions,
  statusOptions,
} from '../js/selectOptions';

export default class EmployeeDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      employee: {},
    };
  }

  componentDidMount() {
    { /* Get the id from the URL and it's get details */ }
    const { id } = this.props.match.params;
    if (id) {
      this.getEmployeeById(id);
    }
  }

  async getEmployeeById(employeeId) {
    { /*  Fetch employee based on the employee id provided */ }
    const vars = { employeeId };
    const data = await graphQLFetch(employeeByIdQuery, vars);
    if (data) {
      const { title, department, status } = data.employeeById;
      this.setState({
        employee: data.employeeById,
        title,
        department,
        status: status == 0 ? 'Retired' : 'Working',
      });
    }
  }

  render() {
    const { firstName, lastName, age, dateOfJoining, employeeType } =
      this.state.employee;

    return (
      <>
        <section id="add-employee-container">
          <h1 className="section-header">
            Employee Details: {firstName} {lastName}
          </h1>
          <form name="updateEmployee" className="add-employee-form">
            <label htmlFor="firstName">First Name</label>
            {firstName && (
              <TextField
                disabled="disabled"
                name="firstName"
                value={firstName}
              />
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
              value={this.state.title}
              disabled="disabled"
              name="title"
              options={titleOptions}
            />
            <span></span>

            <label htmlFor="department">Department</label>
            <SelectField
              value={this.state.department}
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
              value={this.state.status}
              disabled="disabled"
              name="status"
              options={statusOptions}
            />
            <span></span>
          </form>
        </section>
      </>
    );
  }
}
