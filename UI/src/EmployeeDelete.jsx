import React from 'react';
import graphQLFetch from './graphqlAPI';
import { deleteEmployeeByIdQuery, employeeByIdQuery } from './graphqlQueries';
import { withRouter } from 'react-router-dom';

class EmployeeDelete extends React.Component {
  constructor() {
    super();
    this.state = { employee: {} };
    this.deleteEmployee = this.deleteEmployee.bind(this);
  }

  // Get the id from the URL and it's get details
  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) {
      this.getEmployeeById(id);
    }
  }

  // Make an API call to delete the selected employee, and redirect to the employess list screen
  async deleteEmployee() {
    const data = await graphQLFetch(deleteEmployeeByIdQuery, {
      employeeId: this.props.match.params.id,
    });

    if (data) {
      alert('Employee Deleted');
      const { history } = this.props;
      history.push({
        pathname: '/employees',
        search: '',
      });
    }
  }

  // Fetch employee based on the employee id provided
  async getEmployeeById(employeeId) {
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
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={firstName || ''}
            disabled
          />
          <span></span>

          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            defaultValue={lastName || ''}
            disabled
          />
          <span></span>

          <label htmlFor="age">Age</label>
          <input
            type="number"
            name="age"
            id="age"
            defaultValue={age}
            disabled
          />
          <span></span>

          <label htmlFor="dateOfJoining">Date of Joining</label>
          <input
            type="date"
            name="dateOfJoining"
            id="dateOfJoining"
            defaultValue={dateOfJoining}
            disabled
          />
          <span></span>

          <label htmlFor="title">Title</label>
          <select id="title" name="title" value={title} disabled>
            <option value="Employee">Employee</option>
            <option value="Manager">Manager</option>
            <option value="Director">Director</option>
            <option value="VP">VP</option>
          </select>
          <span></span>

          <label htmlFor="department">Department</label>
          <select id="department" name="department" value={department} disabled>
            <option value="IT">IT</option>
            <option value="Marketing">Marketing</option>
            <option value="HR">HR</option>
            <option value="Engineering">Engineering</option>
          </select>
          <span></span>

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
          <span></span>

          <label htmlFor="status">Status</label>
          <select id="status" name="status" value={status} disabled>
            <option value="1">Working</option>
            <option value="0">Retired</option>
          </select>
          <span></span>

          <input
            type="button"
            value="Delete"
            className="delete-employee-btn"
            onClick={this.deleteEmployee}
          />
        </form>
      </section>
    );
  }
}

export default withRouter(EmployeeDelete);
