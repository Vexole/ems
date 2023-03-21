import React from 'react';
import { Route, Routes } from 'react-router-dom';
import EmployeeTable from './EmployeeTable.jsx';
import EmployeeCreate from './EmployeeCreate.jsx';
import NotFound from './NotFound.jsx';
import EmployeeDetails from './EmployeeDetails.jsx';
import EmployeeDirectory from './EmployeeDirectory.jsx';
import validateFormData from './validation.js';
import graphQLFetch from './graphqlAPI.js';

export default class PageRoutes extends React.Component {
  // Define the initial state of the application
  constructor() {
    super();
    this.state = {
      employeesList: [],
      tempEmployeeList: [],
      hasErrors: false,
      formErrors: { firstName: '', lastName: '', age: '', dateOfJoining: '' },
      filter: { key: '', value: '' },
    };
    this.validateFormData = validateFormData.bind(this);
    this.resetFormErrors = this.resetFormErrors.bind(this);
    this.getEmployeesList = this.getEmployeesList.bind(this);
  }

  // GraphQL query to retrieve the employees list, and update the state
  async getEmployeesList() {
    const query = `query {
          employeesList {
            _id firstName lastName age dateOfJoining title department employeeType status
          }
        }`;

    const data = await graphQLFetch(query);
    if (data) {
      this.setState((prev) => ({
        ...prev,
        employeesList: data.employeesList,
        tempEmployeeList: data.employeesList,
      }));
    }
  }

  // Change the status of the form to pristine
  resetFormErrors() {
    this.setState({ hasErrors: false, formErrors: {} });
  }

  // Common function to set the error message.
  setError(field, message = 'This field is required') {
    this.setState((prev) => ({
      formErrors: { ...prev.formErrors, [field]: message },
      hasErrors: true,
    }));
  }

  // GraphQL mutation query to save an employee, and refresh the employees list
  async saveEmployee(employee) {
    const query = `mutation saveEmployee($employee: UserInput!) {
        saveEmployee(employee: $employee) {
          _id
        }
      }`;

    const data = await graphQLFetch(query, { employee });
    if (data) {
      this.getEmployeesList();
    }
  }

  // Save the employee, change the state, and scroll the page
  createEmployee(employee) {
    this.saveEmployee(employee);
    this.setState((prev) => ({
      ...prev,
      hasErrors: false,
    }));
    $('html, body').animate({ scrollTop: 700 }, 'slow');
  }

  // Filter the employee list based on the parameter and keyword
  filterEmployeeList(keyword, value) {
    if (!value) {
      this.setState({ tempEmployeeList: this.state.employeesList });
    } else {
      this.setState({ key: keyword, value });
      this.setState((prev) => ({
        tempEmployeeList: prev.employeesList.filter((employee) =>
          employee[[keyword]].toLowerCase().includes(value.toLowerCase())
        ),
      }));
    }
  }

  // Get the employees list from the DB after the component has been mounted
  componentDidMount() {
    this.getEmployeesList();
  }

  render() {
    return (
      <Routes>
        <Route
          exact
          path="/"
          element={
            <EmployeeDirectory
              employeesList={this.state.tempEmployeeList}
              handleEmployeeCreation={(employee) =>
                this.createEmployee(employee)
              }
              handleValidateFormData={this.validateFormData}
              handleResetFormErrors={this.resetFormErrors}
              formErrors={this.state.formErrors}
              hasErrors={this.state.hasErrors}
              filter={this.state.filter}
              handleEmployeeFilter={(key, value) =>
                this.filterEmployeeList(key, value)
              }
            />
          }
        />
        <Route
          path="/employees"
          element={
            <EmployeeTable
              employeesList={this.state.tempEmployeeList}
              filter={this.state.filter}
              handleEmployeeFilter={(key, value) =>
                this.filterEmployeeList(key, value)
              }
            />
          }
        />
        <Route path="/employee/:id" element={<EmployeeDetails />} />
        <Route path="/search" element={<EmployeeDirectory />} />
        <Route
          path="/employee/create"
          element={
            <EmployeeCreate
              employeesList={this.state.tempEmployeeList}
              handleEmployeeCreation={(employee) =>
                this.createEmployee(employee)
              }
              handleValidateFormData={this.validateFormData}
              handleResetFormErrors={this.resetFormErrors}
              formErrors={this.state.formErrors}
              hasErrors={this.state.hasErrors}
            />
          }
        />
        <Route
          path="/employee/edit/:id"
          element={
            <EmployeeDetails
              mode="edit"
              getEmployeesList={this.getEmployeesList}
            />
          }
        />
        <Route
          path="/employee/delete/:id"
          element={<EmployeeDetails mode="delete" />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }
}
