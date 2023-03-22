import React from 'react';
import EmployeeRow from './EmployeeRow.jsx';
import EmployeeSearch from './EmployeeSearch.jsx';

export default class EmployeeTable extends React.Component {
  render() {
    // Iterate through the employees list and create components for each entry
    const employeesList =
      this.props.employeesList.length > 0 ? (
        this.props.employeesList.map((employees, index) => (
          <EmployeeRow
            employeeDetails={employees}
            key={employees._id}
            index={index}
          />
        ))
      ) : (
        <tr>
          <td colspan="9" className="no-records">No Records Found!</td>
        </tr>
      );

    return (
      <section id="employee-list-container">
        <h1 className="section-header">Employees List</h1>
        <EmployeeSearch
          handleEmployeeFilter={(key, value) =>
            this.props.handleEmployeeFilter(key, value)
          }
        />

        <table className="employees-list">
          <thead>
            <tr>
              <th>S.N.</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Date of Joining</th>
              <th>Title</th>
              <th>Department</th>
              <th>Employee Type</th>
              <th>Current Status</th>
            </tr>
          </thead>
          <tbody>{employeesList}</tbody>
        </table>
      </section>
    );
  }
}
