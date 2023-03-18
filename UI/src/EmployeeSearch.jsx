import React from 'react';

export default class EmployeeSearch extends React.Component {
  constructor() {
    super();
    this.filterEmployeeList = this.filterEmployeeList.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  // Pass the entered keyword and selected parameter for search/filter
  filterEmployeeList(e) {
    e.preventDefault();
    const { filterKeyword, fitlerParameter } = document.forms.filterForm;
    this.props.handleEmployeeFilter(fitlerParameter.value, filterKeyword.value);
  }

  // Reset the search input field when dropdown value changes
  resetForm(e) {
    const { filterKeyword, fitlerParameter } = document.forms.filterForm;
    filterKeyword.value = '';
    this.props.handleEmployeeFilter(fitlerParameter.value, filterKeyword.value);
  }

  render() {
    return (
      <div className="filter-form-container">
        <h3>Filter By: </h3>
        <form
          className="filter-form"
          name="filterForm"
          onSubmit={this.filterEmployeeList}
        >
          <select
            name="fitlerParameter"
            id="fitlerParameter"
            onChange={this.resetForm}
          >
            <option value="firstName">FirstName</option>
            <option value="lastName">LastName</option>
            <option value="title">Title</option>
            <option value="department">Department</option>
            <option value="employeeType">Employee Type</option>
          </select>
          <input
            type="text"
            name="filterKeyword"
            id="filterKeyword"
            onChange={this.filterEmployeeList}
          />
        </form>
      </div>
    );
  }
}
