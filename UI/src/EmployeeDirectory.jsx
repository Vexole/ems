import React from 'react';
import EmployeeTable from './EmployeeTable.jsx';
import EmployeeCreate from './EmployeeCreate.jsx';
import Header from './Header.jsx';

export default class EmployeeDirectory extends React.Component {
  render() {
    return (
      <>
        <Header />
        <EmployeeTable
          employeesList={this.props.employeesList}
          filter={this.props.filter}
          handleEmployeeFilter={this.props.handleEmployeeFilter}
        />
        <EmployeeCreate
          employeesList={this.props.employeesList}
          handleEmployeeCreation={this.props.handleEmployeeCreation}
          handleValidateFormData={this.props.handleValidateFormData}
          handleResetFormErrors={this.props.handleResetFormErrors}
          formErrors={this.props.formErrors}
          hasErrors={this.props.hasErrors}
        />
      </>
    );
  }
}
