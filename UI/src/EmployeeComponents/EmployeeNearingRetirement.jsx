import React from 'react';
import EmployeeTable from './EmployeeTable.jsx';
import Header from '../Header.jsx';
import graphQLFetch from '../js/graphqlAPI.js';
import URLSearchParams from 'url-search-params';
import { withRouter } from 'react-router-dom';
import { employeeNearingRetirementListQuery } from '../js/graphqlQueries.js';

class EmployeeNearingRetirement extends React.Component {
  constructor() {
    { /* Define the initial state of the application */ }
    super();
    this.state = {
      employeesList: [],
      tempEmployeeList: [],
      filter: { key: '', value: '' },
    };
    this.getEmployeesList = this.getEmployeesList.bind(this);
    this.filterEmployeeList = this.filterEmployeeList.bind(this);
  }

  async getEmployeesList() {
    { /*
      * Get the employee type from the URL
      * Run GraphQL query to retrieve the employees list, and update the state
      */ }
    const {
      location: { search },
    } = this.props;

    const params = new URLSearchParams(search);
    const vars = {};
    if (params.get('employeeType')) {
      vars.employeeType = params.get('employeeType');
    }
    const data = await graphQLFetch(employeeNearingRetirementListQuery, vars);
    if (data) {
      this.setState((prev) => ({
        ...prev,
        employeesList: data.employeesListNearingRetirement,
        tempEmployeeList: data.employeesListNearingRetirement,
      }));
    }
  }

  filterEmployeeList(keyword, value) {
    { /* Filter the employee list based on the parameter and keyword */ }
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

  componentDidMount() {
    { /* Get the employees list from the DB after the component has been mounted */ }
    this.getEmployeesList();
  }

  componentDidUpdate(prevProps) {
    { /* Check if the URL parameter has changed, if yes, fetch the new employees list */ }
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
          isRetirementList = {true}
        />
      </>
    );
  }
}

export default withRouter(EmployeeNearingRetirement);
