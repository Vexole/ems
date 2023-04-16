import React from 'react';
import graphQLFetch from '../js/graphqlAPI';
import {
  updateEmployeeByIdQuery,
  employeeByIdQuery,
} from '../js/graphqlQueries';
import NumberField from '../FormFieldComponents/NumberField.jsx';
import TextField from '../FormFieldComponents/TextField.jsx';
import ButtonField from '../FormFieldComponents/ButtonField.jsx';
import DateField from '../FormFieldComponents/DateField.jsx';
import SelectField from '../FormFieldComponents/SelectField.jsx';
import {
  titleOptions,
  departmentOptions,
  employeeTypeOptions,
  statusOptions,
} from '../js/selectOptions';

export default class EmployeeEdit extends React.Component {
  constructor() {
    super();
    this.state = { employee: {}, title: '', department: '', status: '' };
    this.updateEmployee = this.updateEmployee.bind(this);
    this.getEmployeeById = this.getEmployeeById.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  componentDidMount() {
    { /* Get the id from the URL and it's get details */ }
    const { id } = this.props.match.params;
    if (id) {
      this.getEmployeeById(id);
    }
  }

  async getEmployeeById(employeeId) {
    { /* Fetch employee based on the employee id provided */ }
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
    { /* Update the employee details based on the data provided by user in the form */ }
    e.preventDefault();
    { /* Get inputs from the form */ }
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

  handleOnChange(e) {
    this.setState({ [e.target.name]: e.target.value });
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
            value={this.state.title}
            name="title"
            options={titleOptions}
            onChange={this.handleOnChange}
          />
          <span></span>

          <label htmlFor="department">Department</label>
          <SelectField
            value={this.state.department}
            name="department"
            options={departmentOptions}
            onChange={this.handleOnChange}
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
            name="status"
            options={statusOptions}
            onChange={this.handleOnChange}
          />
          <span></span>

          <ButtonField
            value="Update"
            className="edit-employee-btn col-md-6"
            onClick={this.updateEmployee}
          />
        </form>
      </section>
    );
  }
}
