import React from 'react';
import graphQLFetch from './graphqlAPI';
import { useParams } from 'react-router-dom';
import EmployeeDelete from './EmployeeDelete.jsx';
import EmployeeEdit from './EmployeeEdit.jsx';

function getParam(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class EmployeeDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      employee: {},
      hasErrors: false,
      formErrors: { firstName: '', lastName: '', age: '', dateOfJoining: '' },
      title: '',
      department: '',
      status: '',
    };
    this.resetFormErrors = this.resetFormErrors.bind(this);
    this.getEmployeeById = this.getEmployeeById.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDepartmentChange = this.handleDepartmentChange.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  componentDidMount() {
    this.employeeId = this.props.params.id;
    if (this.employeeId) {
      this.getEmployeeById(this.employeeId);
    }
  }

  resetFormErrors() {
    this.setState({ hasErrors: false, formErrors: {} });
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

  async getEmployeeById(employeeId) {
    const query = `query EmployeeById($employeeId: ID!) {
        employeeById(employeeId: $employeeId) {
          _id firstName lastName age dateOfJoining title department employeeType status
        }
      }`;

    const vars = { employeeId };
    const data = await graphQLFetch(query, vars);
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
    const { _id, firstName, lastName, age, dateOfJoining, employeeType } =
      this.state.employee;

    this.textStatus = status == 0 ? 'Retired' : 'Working';
    this.mode = this.props.mode;
    this.disabled = { disabled: 'disabled' };

    if (this.mode === 'delete') {
      this.actionButton = <EmployeeDelete employeeId={_id} />;
    } else if (this.mode === 'edit') {
      this.actionButton = (
        <EmployeeEdit
          employee={this.state.employee}
          handleResetFormErrors={this.resetFormErrors}
          handleGetEmployee={this.getEmployeeById}
          getEmployeesList={this.props.getEmployeesList}
        />
      );
      this.disabled = '';
    }

    return (
      <>
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
            <select
              id="title"
              name="title"
              value={this.state.title}
              {...this.disabled}
              onChange={this.handleTitleChange}
            >
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
              {...this.disabled}
              onChange={this.handleDepartmentChange}
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
              {...this.disabled}
              onChange={this.handleStatusChange}
            >
              <option value="Working">Working</option>
              <option value="Retired">Retired</option>
            </select>

            <p className="errors">
              {this.props.hasErrors && this.props.formErrors.employeeType}
            </p>

            {this.actionButton}
          </form>
        </section>
      </>
    );
  }
}

export default getParam(EmployeeDetails);
