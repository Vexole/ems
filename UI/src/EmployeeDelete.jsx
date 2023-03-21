import React from 'react';
import graphQLFetch from './graphqlAPI';

export default class EmployeeDelete extends React.Component {
  constructor() {
    super();
    this.deleteEmployee = this.deleteEmployee.bind(this);
  }

  async deleteEmployee() {
    const query = `mutation DeleteEmployee($employeeId: ID!) {
      deleteEmployee(employeeId: $employeeId) {
        _id
      }
    }`;

    const data = await graphQLFetch(query, {
      employeeId: this.props.employeeId,
    });

    if (data) {
      alert('Employee Deleted');
      location.href = '/';
    }
  }

  render() {
    return (
      <input
        type="button"
        value="Delete"
        className="create-employee-btn"
        onClick={this.deleteEmployee}
      />
    );
  }
}
