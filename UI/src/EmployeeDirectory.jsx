import React from 'react';
import EmployeeTable from './EmployeeTable.jsx';
import Header from './Header.jsx';
import graphQLFetch from './graphqlAPI.js';
import URLSearchParams from 'url-search-params';
import { withRouter } from 'react-router-dom';
import { employeeListQuery } from './graphqlQueries.js';

class EmployeeDirectory extends React.Component {
  // Define the initial state of the application
  constructor() {
    super();
    this.state = {
      employeesList: [],
      tempEmployeeList: [],
      filter: { key: '', value: '' },
    };
    this.getEmployeesList = this.getEmployeesList.bind(this);
    this.filterEmployeeList = this.filterEmployeeList.bind(this);
  }

  /*
   * Get the employee type from the URL
   * Run GraphQL query to retrieve the employees list, and update the state
   */
  async getEmployeesList() {
    const {
      location: { search },
    } = this.props;

    const params = new URLSearchParams(search);
    const vars = {};
    if (params.get('employeeType')) {
      vars.employeeType = params.get('employeeType');
    }

    const data = await graphQLFetch(employeeListQuery, vars);
    if (data) {
      this.setState((prev) => ({
        ...prev,
        employeesList: data.employeesList,
        tempEmployeeList: data.employeesList,
      }));
    }
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

  /* 
   * Check if the URL parameter has changed, if yes, fetch the new employees list
   */
  componentDidUpdate(prevProps) {
    const {
      location: { search: prevSearch },
    } = prevProps;
    const {
      location: { search },
    } = this.props;
    if (prevSearch !== search) {
      this.getEmployeesList();
    }
  }

  render() {
    return (
      <>
        <Header />
        <EmployeeTable
          employeesList={this.state.tempEmployeeList}
          filter={this.filter}
          handleEmployeeFilter={this.filterEmployeeList}
        />
      </>
    );
  }
}

export default withRouter(EmployeeDirectory);
