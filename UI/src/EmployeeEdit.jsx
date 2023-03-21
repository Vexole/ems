import React from 'react';
import graphQLFetch from './graphqlAPI';
import validateFormData from './validation';

export default class EmployeeEdit extends React.Component {
  constructor() {
    super();
    this.updateEmployee = this.updateEmployee.bind(this);
  }

  async updateEmployee(e) {
    e.preventDefault();
    // Get inputs from the form
    const { _id, title, department, status } = document.forms.updateEmployee;
    const { firstName, lastName, age, dateOfJoining, employeeType } =
      this.props.employee;

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

    const query = `mutation UpdateEmployee($employee: UserUpdate!) {
      updateEmployee(employee: $employee)
    }`;

    const data = await graphQLFetch(query, { employee });
    if (data) {
      alert('Employee Updated');
      this.props.getEmployeesList();
      this.props.handleGetEmployee(data.updateEmployee);
    }
  }

  render() {
    return (
      <input
        type="button"
        value="Update"
        className="create-employee-btn"
        onClick={this.updateEmployee}
      />
    );
  }
}
