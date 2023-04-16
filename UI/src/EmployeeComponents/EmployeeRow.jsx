import React from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

{ /* Component to display each row for an employee */ }
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
        <Link to={`/detail/${_id}`}> <FaEye className="blue" /> </Link>
        <Link to={`/edit/${_id}`}> <FaEdit className="green" /> </Link>
        <Link to={`/delete/${_id}`}> <FaTrash className="red" /> </Link>
      </td>
    </tr>
  );
}
