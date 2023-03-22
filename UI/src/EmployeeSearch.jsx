import React from 'react';
import { withRouter } from 'react-router-dom';

class EmployeeSearch extends React.Component {
  constructor() {
    super();
    this.filterEmployeeList = this.filterEmployeeList.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.onChangeEmployeeType = this.onChangeEmployeeType.bind(this);
  }

  onChangeEmployeeType(e) {
    const employeeType = e.target.value;
    this.resetForm();
    const { history } = this.props;
    history.push({
      pathname: '/employees',
      search: employeeType ? `?employeeType=${employeeType}` : '',
    });
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
      <>
        <form className='search-form-container'>
          <h3>Employee Type: </h3>
          <select onChange={this.onChangeEmployeeType}>
            <option value="">(All)</option>
            <option value="FullTime">Full-Time</option>
            <option value="PartTime">Part-Time</option>
            <option value="Contract">Contract</option>
            <option value="Seasonal">Seasonal</option>
          </select>
        </form>
        <div className="filter-form-container">
          <h3>Search By: </h3>
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
      </>
    );
  }
}

export default withRouter(EmployeeSearch);
