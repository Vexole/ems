import React from 'react';
import graphQLFetch from './graphqlAPI';
import { updateEmployeeByIdQuery, employeeByIdQuery } from './graphqlQueries';

export default class EmployeeEdit extends React.Component {
  constructor() {
    super();
    this.state = { employee: {}, title: '', department: '', status: '' };
    this.updateEmployee = this.updateEmployee.bind(this);
    this.getEmployeeById = this.getEmployeeById.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDepartmentChange = this.handleDepartmentChange.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
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

  async updateEmployee(e) {
    e.preventDefault();
    // Get inputs from the form
    const { _id, title, department, status } = document.forms.updateEmployee;
    const { firstName, lastName, age, dateOfJoining, employeeType } =
      this.state.employee;

    const employee = {
      _id: _id.value,
      firstName,
      lastName,
      age: +age,
      dateOfJoining,
      title: title.value,
      department: department.value,
      employeeType,
      status: status.value == 'Retired' ? 0 : 1,
    };

    const data = await graphQLFetch(updateEmployeeByIdQuery, { employee });
    if (data) {
      alert('Employee Updated');
      this.getEmployeeById(data.updateEmployee);
    }
  }

  handleTitleChange(e) {
    this.setState({ title: e.target.value });
  }

  handleDepartmentChange(e) {
    this.setState({ department: e.target.value });
  }

  handleStatusChange(e) {
    this.setState({ status: e.target.value });
  }

  render() {
    const { _id, firstName, lastName, age, dateOfJoining, employeeType } =
      this.state.employee;

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
          <select
            id="title"
            name="title"
            value={this.state.title}
            onChange={this.handleTitleChange}
          >
            <option value="Employee">Employee</option>
            <option value="Manager">Manager</option>
            <option value="Director">Director</option>
            <option value="VP">VP</option>
          </select>
          <span></span>

          <label htmlFor="department">Department</label>
          <select
            id="department"
            name="department"
            value={this.state.department}
            onChange={this.handleDepartmentChange}
          >
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
          <select
            id="status"
            name="status"
            value={this.state.status}
            onChange={this.handleStatusChange}
          >
            <option value="Working">Working</option>
            <option value="Retired">Retired</option>
          </select>
          <span></span>

          <input
            type="button"
            value="Update"
            className="edit-employee-btn"
            onClick={this.updateEmployee}
          />
        </form>
      </section>
    );
  }
}
