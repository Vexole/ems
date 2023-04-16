import React from 'react';
import validateFormData from '../js/validation';
import graphQLFetch from '../js/graphqlAPI';
import { saveEmployeeQuery } from '../js/graphqlQueries';
import TextField from '../FormFieldComponents/TextField.jsx';
import NumberField from '../FormFieldComponents/NumberField.jsx';
import DateField from '../FormFieldComponents/DateField.jsx';
import SelectField from '../FormFieldComponents/SelectField.jsx';
import {
  titleOptions,
  departmentOptions,
  employeeTypeOptions,
} from '../js/selectOptions';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CustomToast from '../Utils/Toast.jsx';

export default class EmployeeCreate extends React.Component {
  constructor() {
    super();
    this.state = {
      employee: {},
      hasErrors: false,
      formErrors: { firstName: '', lastName: '', age: '', dateOfJoining: '', toastMessage: '', toastVariant: '', showToast: false },
    };
    this.createEmployee = this.createEmployee.bind(this);
    this.validateFormData = validateFormData.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.displayToast = this.displayToast.bind(this);
  }

  resetFormErrors() {
    { /* Change the status of the form to pristine */ }
    this.setState({ hasErrors: false, formErrors: {} });
  }

  setError(field, message = 'This field is required') {
    { /* Common function to set the error message. */ }
    this.setState((prev) => ({
      formErrors: { ...prev.formErrors, [field]: message },
      hasErrors: true,
    }));
  }

  displayToast() {
    this.setState({ toastMessage: "Employee created successfully.", toastVariant: "success", showToast: true });
    setTimeout(() => {
      this.setState({ showToast: false });
    }, 3000);
  }

  handleOnChange(e) {
    this.setState((prev) => ({
      employee: { ...prev.employee, [e.target.name]: e.target.value },
    }));
  }

  async saveEmployee(employee) {
    { /* GraphQL mutation query to save an employee, and refresh the employees list */ }
    const data = await graphQLFetch(saveEmployeeQuery, { employee });
    try {
      if (data) {
        this.displayToast();
        const { history } = this.props;
        history.push({
          pathname: '/employees',
          search: '',
        });
      }
    } catch (e) {
    }
  }

  createEmployee(e) {
    e.preventDefault();
    { /* Get inputs from the form */ }
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

    {
      /*
       * If user input is not valid, show the error,
       * Else make the API call, and reset the form
       */
    }
    this.resetFormErrors();
    const isFormValid = this.validateFormData(employee);
    if (!isFormValid) return;

    this.saveEmployee(employee);
    this.setState((prev) => ({
      ...prev,
      hasErrors: false,
    }));

    e.target.reset();
  }

  render() {
    const {
      employee: { firstName, lastName, age, dateOfJoining, title, department, employeeType },
    } = this.state;
    const {toastMessage, toastVariant, showToast} = this.state;
    return (
      <section id="add-employee-container">
        {showToast && (<CustomToast message={toastMessage} variant={toastVariant}/>)}
        <h1 className="section-header">Add a New Employee</h1>
        <Form
          name="addEmployee"
          onSubmit={this.createEmployee}
          className="add-employee-form"
        >
          <Form.Label htmlFor="firstName">First Name</Form.Label>
          <TextField
            name="firstName"
            id="firstName"
            value={firstName || ''}
            onChange={this.handleOnChange}
          />
          <p className="errors">
            {this.state.hasErrors && this.state.formErrors.firstName}
          </p>

          <Form.Label htmlFor="lastName">Last Name</Form.Label>
          <TextField
            name="lastName"
            id="lastName"
            value={lastName || ''}
            onChange={this.handleOnChange}
          />
          <p className="errors">
            {this.state.hasErrors && this.state.formErrors.lastName}
          </p>

          <Form.Label htmlFor="age">Age</Form.Label>
          <NumberField name="age" value={age || 0} onChange={this.handleOnChange} />
          <p className="errors">
            {this.state.hasErrors && this.state.formErrors.age}
          </p>

          <Form.Label htmlFor="dateOfJoining">Date of Joining</Form.Label>
          <DateField
            name="dateOfJoining"
            value={dateOfJoining || ''}
            onChange={this.handleOnChange}
          />
          <p className="errors">
            {this.state.hasErrors && this.state.formErrors.dateOfJoining}
          </p>

          <Form.Label htmlFor="title">Title</Form.Label>
          <SelectField
            value={title}
            name="title"
            options={titleOptions}
            onChange={this.handleOnChange}
          />
          <p className="errors">{this.hasErrors && this.formErrors.title}</p>

          <Form.Label htmlFor="department">Department</Form.Label>
          <SelectField
            value={department}
            name="department"
            options={departmentOptions}
            onChange={this.handleOnChange}
          />
          <p className="errors">
            {this.hasErrors && this.formErrors.department}
          </p>

          <Form.Label htmlFor="employeeType">Employee Type</Form.Label>
          <SelectField
            value={employeeType}
            name="employeeType"
            options={employeeTypeOptions}
            onChange={this.handleOnChange}
          />
          <p className="errors">
            {this.hasErrors && this.formErrors.employeeType}
          </p>

          <Button type="submit" className="create-employee-btn col-md-6">Submit</Button>
        </Form>
      </section>
    );
  }
}
