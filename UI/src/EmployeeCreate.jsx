import React from 'react';

export default class EmployeeCreate extends React.Component {
  constructor() {
    super();
    this.createEmployee = this.createEmployee.bind(this);
  }

  createEmployee(e) {
    e.preventDefault();
    // Get inputs from the form
    const {
      firstName,
      lastName,
      age,
      dateOfJoining,
      title,
      department,
      employeeType,
    } = document.forms.addEmployee;

    const employee = {
      firstName: firstName.value.trim(),
      lastName: lastName.value.trim(),
      age: +age.value.trim(),
      dateOfJoining: dateOfJoining.value,
      title: title.value,
      department: department.value,
      employeeType: employeeType.value,
    };

    /*
     * If user input is not valid, show the error,
     * Else make the API call, and reset the form
     */
    this.props.handleResetFormErrors();
    const isFormValid = this.props.handleValidateFormData(employee);
    if (!isFormValid) return;

    this.props.handleEmployeeCreation(employee);
    e.target.reset();
  }

  render() {
    return (
      <section id="add-employee-container">
        <h1 className="section-header">Add a New Employee</h1>
        <form
          name="addEmployee"
          onSubmit={this.createEmployee}
          className="add-employee-form"
        >
          <label htmlFor="firstName">First Name</label>
          <input type="text" name="firstName" id="firstName" />
          <p className="errors">
            {this.props.hasErrors && this.props.formErrors.firstName}
          </p>

          <label htmlFor="lastName">Last Name</label>
          <input type="text" name="lastName" id="lastName" />
          <p className="errors">
            {this.props.hasErrors && this.props.formErrors.lastName}
          </p>

          <label htmlFor="age">Age</label>
          <input type="number" name="age" id="age" />
          <p className="errors">
            {this.props.hasErrors && this.props.formErrors.age}
          </p>

          <label htmlFor="dateOfJoining">Date of Joining</label>
          <input type="date" name="dateOfJoining" id="dateOfJoining" />
          <p className="errors">
            {this.props.hasErrors && this.props.formErrors.dateOfJoining}
          </p>

          <label htmlFor="title">Title</label>
          <select id="title" name="title">
            <option value="Employee">Employee</option>
            <option value="Manager">Manager</option>
            <option value="Director">Director</option>
            <option value="VP">VP</option>
          </select>
          <p className="errors">
            {this.props.hasErrors && this.props.formErrors.title}
          </p>

          <label htmlFor="department">Department</label>
          <select id="department" name="department">
            <option value="IT">IT</option>
            <option value="Marketing">Marketing</option>
            <option value="HR">HR</option>
            <option value="Engineering">Engineering</option>
          </select>
          <p className="errors">
            {this.props.hasErrors && this.props.formErrors.department}
          </p>

          <label htmlFor="employeeType">Employee Type</label>
          <select id="employeeType" name="employeeType">
            <option value="FullTime">Full Time</option>
            <option value="PartTime">Part Time</option>
            <option value="Contract">Contract</option>
            <option value="Seasonal">Seasonal</option>
          </select>
          <p className="errors">
            {this.props.hasErrors && this.props.formErrors.employeeType}
          </p>

          <input type="submit" value="Submit" className="create-employee-btn" />
        </form>
      </section>
    );
  }
}
