import React from 'react';
import graphQLFetch from './graphqlAPI';
import { employeeByIdQuery } from './graphqlQueries';

export default class EmployeeDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      employee: {},
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) {
      this.getEmployeeById(id);
    }
  }

  async getEmployeeById(employeeId) {
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
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={firstName || ''}
              disabled
            />
            <p className="errors">
              {this.props.hasErrors && this.props.formErrors.firstName}
            </p>

            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              defaultValue={lastName || ''}
              disabled
            />
            <p className="errors">
              {this.props.hasErrors && this.props.formErrors.lastName}
            </p>

            <label htmlFor="age">Age</label>
            <input
              type="number"
              name="age"
              id="age"
              defaultValue={age}
              disabled
            />
            <p className="errors">
              {this.props.hasErrors && this.props.formErrors.age}
            </p>

            <label htmlFor="dateOfJoining">Date of Joining</label>
            <input
              type="date"
              name="dateOfJoining"
              id="dateOfJoining"
              defaultValue={dateOfJoining}
              disabled
            />
            <p className="errors">
              {this.props.hasErrors && this.props.formErrors.dateOfJoining}
            </p>

            <label htmlFor="title">Title</label>
            <select id="title" name="title" value={this.state.title} disabled>
              <option value="Employee">Employee</option>
              <option value="Manager">Manager</option>
              <option value="Director">Director</option>
              <option value="VP">VP</option>
            </select>
            <p className="errors">
              {this.props.hasErrors && this.props.formErrors.title}
            </p>

            <label htmlFor="department">Department</label>
            <select
              id="department"
              name="department"
              value={this.state.department}
              disabled
            >
              <option value="IT">IT</option>
              <option value="Marketing">Marketing</option>
              <option value="HR">HR</option>
              <option value="Engineering">Engineering</option>
            </select>
            <p className="errors">
              {this.props.hasErrors && this.props.formErrors.department}
            </p>

            <label htmlFor="employeeType">Employee Type</label>
            <select
              id="employeeType"
              name="employeeType"
              value={employeeType}
              disabled
            >
              <option value="FullTime">Full Time</option>
              <option value="PartTime">Part Time</option>
              <option value="Contract">Contract</option>
              <option value="Seasonal">Seasonal</option>
            </select>
            <p className="errors">
              {this.props.hasErrors && this.props.formErrors.employeeType}
            </p>

            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={this.state.status}
              disabled
              onChange={this.handleStatusChange}
            >
              <option value="Working">Working</option>
              <option value="Retired">Retired</option>
            </select>

            <p className="errors">
              {this.props.hasErrors && this.props.formErrors.employeeType}
            </p>
          </form>
        </section>
      </>
    );
  }
}
