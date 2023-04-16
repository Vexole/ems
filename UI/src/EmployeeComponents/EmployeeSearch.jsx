import React from 'react';
import { withRouter } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import "bootstrap/dist/css/bootstrap.min.css";

class EmployeeSearch extends React.Component {
  constructor() {
    super();
    this.filterEmployeeList = this.filterEmployeeList.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.onChangeEmployeeType = this.onChangeEmployeeType.bind(this);
  }

  onChangeEmployeeType(e) {
    { /* Change the history of the URL when user tries to filter the employees record */ }
    const employeeType = e.target.value;
    this.resetForm();
    const { history } = this.props;
    if (this.props.isRetirementList) {
      history.push({
        pathname: '/employeesNearingRetirement',
        search: employeeType ? `?employeeType=${employeeType}` : '',
      });
    } else {
      history.push({
        pathname: '/employees',
        search: employeeType ? `?employeeType=${employeeType}` : '',
      });
    }
  }

  filterEmployeeList(e) {
    { /* Pass the entered keyword and selected parameter for search/filter */}
    e.preventDefault();
    const { filterKeyword, fitlerParameter } = document.forms.filterForm;
    this.props.handleEmployeeFilter(fitlerParameter.value, filterKeyword.value);
  }

  resetForm(e) {
    { /* Reset the search input field when dropdown value changes */ }
    const { filterKeyword, fitlerParameter } = document.forms.filterForm;
    filterKeyword.value = '';
    this.props.handleEmployeeFilter(fitlerParameter.value, filterKeyword.value);
  }

  render() {
    const {
      location: { search },
    } = this.props;

    const params = new URLSearchParams(search);
    const employeeType = params.get('employeeType');
    return (
      <>
        <Form className="search-form-container">
          <Form.Label>Employee Type: </Form.Label>
          <Form.Select
            onChange={this.onChangeEmployeeType}
            defaultValue={employeeType ?? ''}
          >
            <option value="">(All)</option>
            <option value="FullTime">Full-Time</option>
            <option value="PartTime">Part-Time</option>
            <option value="Contract">Contract</option>
            <option value="Seasonal">Seasonal</option>
          </Form.Select>
        </Form>
        <div className="filter-form-container">
          <Form
            className="filter-form"
            name="filterForm"
            onSubmit={this.filterEmployeeList}
            >
            <Form.Label>Search By: </Form.Label>
            <Form.Select
              name="fitlerParameter"
              id="fitlerParameter"
              onChange={this.resetForm}
            >
              <option value="firstName">FirstName</option>
              <option value="lastName">LastName</option>
              <option value="title">Title</option>
              <option value="department">Department</option>
              <option value="employeeType">Employee Type</option>
            </Form.Select>
            <Form.Control
              type="text"
              name="filterKeyword"
              id="filterKeyword"
              onChange={this.filterEmployeeList}
            />
          </Form>
        </div>
      </>
    );
  }
}

export default withRouter(EmployeeSearch);
