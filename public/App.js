const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');
function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return value.split('T')[0];
  return value;
}
async function graphQLFetch(query, variables = {}) {
  try {
    const response = await fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query,
        variables
      })
    });
    const body = await response.text();
    const result = JSON.parse(body, jsonDateReviver);
    if (result.errors) {
      const error = result.errors[0];
      if (error.extensions.code == 'BAD_USER_INPUT') {
        const details = error.extensions.exception.errors.join('\n ');
        alert(`${error.message}:\n ${details}`);
      } else {
        alert(`${error.extensions.code}: ${error.message}`);
      }
    }
    return result.data;
  } catch (e) {
    alert(`Error in sending data to server: ${e.message}`);
  }
}
class EmployeeCreate extends React.Component {
  createEmployee(e) {
    e.preventDefault();
    const {
      firstName,
      lastName,
      age,
      dateOfJoining,
      title,
      department,
      employeeType
    } = document.forms.addEmployee;
    const employee = {
      firstName: firstName.value,
      lastName: lastName.value,
      age: +age.value,
      dateOfJoining: dateOfJoining.value,
      title: title.value,
      department: department.value,
      employeeType: employeeType.value
    };
    this.props.handleResetFormErrors();
    const isFormValid = this.props.handleValidateFormData(employee);
    if (!isFormValid) return;
    this.props.handleEmployeeCreation(employee);
    e.target.reset();
  }
  render() {
    return /*#__PURE__*/React.createElement("section", {
      id: "add-employee-container"
    }, /*#__PURE__*/React.createElement("h1", {
      className: "section-header"
    }, "Add a New Employee"), /*#__PURE__*/React.createElement("form", {
      name: "addEmployee",
      onSubmit: this.createEmployee.bind(this),
      className: "add-employee-form"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "firstName"
    }, "First Name"), /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "firstName",
      id: "firstName"
    }), /*#__PURE__*/React.createElement("p", {
      className: "errors"
    }, this.props.hasErrors && this.props.formErrors.firstName), /*#__PURE__*/React.createElement("label", {
      htmlFor: "lastName"
    }, "Last Name"), /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "lastName",
      id: "lastName"
    }), /*#__PURE__*/React.createElement("p", {
      className: "errors"
    }, this.props.hasErrors && this.props.formErrors.lastName), /*#__PURE__*/React.createElement("label", {
      htmlFor: "age"
    }, "Age"), /*#__PURE__*/React.createElement("input", {
      type: "number",
      name: "age",
      id: "age"
    }), /*#__PURE__*/React.createElement("p", {
      className: "errors"
    }, this.props.hasErrors && this.props.formErrors.age), /*#__PURE__*/React.createElement("label", {
      htmlFor: "dateOfJoining"
    }, "Date of Joining"), /*#__PURE__*/React.createElement("input", {
      type: "date",
      name: "dateOfJoining",
      id: "dateOfJoining"
    }), /*#__PURE__*/React.createElement("p", {
      className: "errors"
    }, this.props.hasErrors && this.props.formErrors.dateOfJoining), /*#__PURE__*/React.createElement("label", {
      htmlFor: "title"
    }, "Title"), /*#__PURE__*/React.createElement("select", {
      id: "title",
      name: "title"
    }, /*#__PURE__*/React.createElement("option", {
      value: "Employee"
    }, "Employee"), /*#__PURE__*/React.createElement("option", {
      value: "Manager"
    }, "Manager"), /*#__PURE__*/React.createElement("option", {
      value: "Director"
    }, "Director"), /*#__PURE__*/React.createElement("option", {
      value: "VP"
    }, "VP")), /*#__PURE__*/React.createElement("p", {
      className: "errors"
    }, this.props.hasErrors && this.props.formErrors.title), /*#__PURE__*/React.createElement("label", {
      htmlFor: "department"
    }, "Department"), /*#__PURE__*/React.createElement("select", {
      id: "department",
      name: "department"
    }, /*#__PURE__*/React.createElement("option", {
      value: "IT"
    }, "IT"), /*#__PURE__*/React.createElement("option", {
      value: "Marketing"
    }, "Marketing"), /*#__PURE__*/React.createElement("option", {
      value: "HR"
    }, "HR"), /*#__PURE__*/React.createElement("option", {
      value: "Engineering"
    }, "Engineering")), /*#__PURE__*/React.createElement("p", {
      className: "errors"
    }, this.props.hasErrors && this.props.formErrors.department), /*#__PURE__*/React.createElement("label", {
      htmlFor: "employeeType"
    }, "Employee Type"), /*#__PURE__*/React.createElement("select", {
      id: "employeeType",
      name: "employeeType"
    }, /*#__PURE__*/React.createElement("option", {
      value: "FullTime"
    }, "Full Time"), /*#__PURE__*/React.createElement("option", {
      value: "PartTime"
    }, "Part Time"), /*#__PURE__*/React.createElement("option", {
      value: "Contract"
    }, "Contract"), /*#__PURE__*/React.createElement("option", {
      value: "Seasonal"
    }, "Seasonal")), /*#__PURE__*/React.createElement("p", {
      className: "errors"
    }, this.props.hasErrors && this.props.formErrors.employeeType), /*#__PURE__*/React.createElement("input", {
      type: "submit",
      value: "Submit",
      className: "create-employee-btn"
    })));
  }
}
const EmployeeRow = props => {
  const {
    firstName,
    lastName,
    age,
    dateOfJoining,
    title,
    department,
    employeeType,
    status
  } = props.employeeDetails;
  return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, props.index + 1), /*#__PURE__*/React.createElement("td", null, firstName), /*#__PURE__*/React.createElement("td", null, lastName), /*#__PURE__*/React.createElement("td", null, age), /*#__PURE__*/React.createElement("td", null, dateOfJoining), /*#__PURE__*/React.createElement("td", null, title), /*#__PURE__*/React.createElement("td", null, department), /*#__PURE__*/React.createElement("td", null, employeeType), /*#__PURE__*/React.createElement("td", null, status == 1 ? 'Working' : 'Retired'));
};
const EmployeeTable = props => {
  const employeesList = props.employeesList.map((employees, index) => /*#__PURE__*/React.createElement(EmployeeRow, {
    employeeDetails: employees,
    key: employees.id,
    index: index
  }));
  return /*#__PURE__*/React.createElement("section", {
    id: "employee-list-container"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "section-header"
  }, "Employees List"), /*#__PURE__*/React.createElement(EmployeeSearch, {
    handleEmployeeFilter: (key, value) => props.handleEmployeeFilter(key, value)
  }), /*#__PURE__*/React.createElement("table", {
    className: "employees-list"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "S.N."), /*#__PURE__*/React.createElement("th", null, "First Name"), /*#__PURE__*/React.createElement("th", null, "Last Name"), /*#__PURE__*/React.createElement("th", null, "Age"), /*#__PURE__*/React.createElement("th", null, "Date of Joining"), /*#__PURE__*/React.createElement("th", null, "Title"), /*#__PURE__*/React.createElement("th", null, "Department"), /*#__PURE__*/React.createElement("th", null, "Employee Type"), /*#__PURE__*/React.createElement("th", null, "Current Status"))), /*#__PURE__*/React.createElement("tbody", null, employeesList)));
};
class EmployeeSearch extends React.Component {
  filterEmployeeList(e) {
    e.preventDefault();
    const {
      filterKeyword,
      fitlerParameter
    } = document.forms.filterForm;
    this.props.handleEmployeeFilter(fitlerParameter.value, filterKeyword.value);
  }
  resetForm(e) {
    const {
      filterKeyword,
      fitlerParameter
    } = document.forms.filterForm;
    filterKeyword.value = '';
    this.props.handleEmployeeFilter(fitlerParameter.value, filterKeyword.value);
  }
  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "filter-form-container"
    }, /*#__PURE__*/React.createElement("h3", null, "Filter By: "), /*#__PURE__*/React.createElement("form", {
      className: "filter-form",
      name: "filterForm",
      onSubmit: this.filterEmployeeList.bind(this)
    }, /*#__PURE__*/React.createElement("select", {
      name: "fitlerParameter",
      id: "fitlerParameter",
      onChange: this.resetForm.bind(this)
    }, /*#__PURE__*/React.createElement("option", {
      value: "firstName"
    }, "FirstName"), /*#__PURE__*/React.createElement("option", {
      value: "lastName"
    }, "LastName"), /*#__PURE__*/React.createElement("option", {
      value: "title"
    }, "Title"), /*#__PURE__*/React.createElement("option", {
      value: "department"
    }, "Department"), /*#__PURE__*/React.createElement("option", {
      value: "employeeType"
    }, "Employee Type")), /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "filterKeyword",
      id: "filterKeyword",
      onChange: this.filterEmployeeList.bind(this)
    })));
  }
}
class EmployeeDirectory extends React.Component {
  constructor() {
    super();
    this.state = {
      employeesList: [],
      tempEmployeeList: [],
      hasErrors: false,
      formErrors: {
        firstName: '',
        lastName: '',
        age: '',
        dateOfJoining: ''
      },
      filter: {
        key: '',
        value: ''
      }
    };
  }
  async getEmployeesList() {
    const query = `query {
      employeesList {
        id firstName lastName age dateOfJoining title department employeeType status
      }
    }`;
    const data = await graphQLFetch(query);
    if (data) {
      this.setState(prev => ({
        ...prev,
        employeesList: data.employeesList,
        tempEmployeeList: data.employeesList
      }));
    }
  }
  async saveEmployee(employee) {
    const query = `mutation saveEmployee($employee: UserInput!) {
      saveEmployee(employee: $employee) {
        id
      }
    }`;
    const data = await graphQLFetch(query, {
      employee
    });
    if (data) {
      this.getEmployeesList();
    }
  }
  componentDidMount() {
    this.getEmployeesList();
  }
  createEmployee(employee) {
    this.saveEmployee(employee);
    this.setState(prev => ({
      ...prev,
      hasErrors: false
    }));
  }
  resetFormErrors() {
    this.setState({
      hasErrors: false,
      formErrors: {}
    });
  }
  validateFormData({
    firstName,
    lastName,
    age,
    dateOfJoining
  }) {
    let isFormValid = true;
    if (!firstName) {
      isFormValid = false;
      this.setState(prev => ({
        formErrors: {
          ...prev.formErrors,
          firstName: 'This field is required'
        },
        hasErrors: true
      }));
    }
    if (!lastName) {
      isFormValid = false;
      this.setState(prev => ({
        formErrors: {
          ...prev.formErrors,
          lastName: 'This field is required'
        },
        hasErrors: true
      }));
    }
    if (!age) {
      isFormValid = false;
      this.setState(prev => ({
        formErrors: {
          ...prev.formErrors,
          age: 'This field is required'
        },
        hasErrors: true
      }));
    } else if (age < 20 || age > 70) {
      isFormValid = false;
      this.setState(prev => ({
        formErrors: {
          ...prev.formErrors,
          age: 'Age must be between 20 and 70'
        },
        hasErrors: true
      }));
    }
    if (!dateOfJoining) {
      isFormValid = false;
      this.setState(prev => ({
        formErrors: {
          ...prev.formErrors,
          dateOfJoining: 'This field is required'
        },
        hasErrors: true
      }));
    }
    return isFormValid;
  }
  filterEmployeeList(keyword, value) {
    if (!value) {
      this.setState({
        tempEmployeeList: this.state.employeesList
      });
    } else {
      this.setState({
        key: keyword,
        value
      });
      this.setState(prev => ({
        tempEmployeeList: prev.employeesList.filter(employee => employee[[keyword]].toLowerCase().includes(value.toLowerCase()))
      }));
    }
  }
  render() {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(EmployeeTable, {
      employeesList: this.state.tempEmployeeList,
      filter: this.state.filter,
      handleEmployeeFilter: (key, value) => this.filterEmployeeList(key, value)
    }), /*#__PURE__*/React.createElement(EmployeeCreate, {
      employeesList: this.state.tempEmployeeList,
      handleEmployeeCreation: employee => this.createEmployee(employee),
      handleValidateFormData: this.validateFormData.bind(this),
      handleResetFormErrors: this.resetFormErrors.bind(this),
      formErrors: this.state.formErrors,
      hasErrors: this.state.hasErrors
    }));
  }
}
const element = /*#__PURE__*/React.createElement(EmployeeDirectory, null);
ReactDOM.render(element, document.getElementById('root'));