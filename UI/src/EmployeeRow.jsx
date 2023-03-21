import React from 'react';

// Component to display each row for an employee
export default function EmployeeRow(props) {
  const {
    _id,
    firstName,
    lastName,
    age,
    dateOfJoining,
    title,
    department,
    employeeType,
    status,
  } = props.employeeDetails;

  return (
    <tr>
      <td>{props.index + 1}</td>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{age}</td>
      <td>{dateOfJoining}</td>
      <td>{title}</td>
      <td>{department}</td>
      <td>{employeeType.split(/\.?(?=[A-Z])/).join('-')}</td>
      <td>{status == 1 ? 'Working' : 'Retired'}</td>
      <td>
        <a href={`/#/employee/${_id}`}>View</a> |{' '}
        <a href={`/#/employee/edit/${_id}`}> Edit</a> |
        <a href={`/#/employee/delete/${_id}`}> Delete</a>
      </td>
    </tr>
  );
}
