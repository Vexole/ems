const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');
function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return value.split('T')[0];
  return value;
}

async function graphQLFetch(query, variables = {}) {
  try {
    const response = await fetch('/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
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
      employeeType,
    } = document.forms.addEmployee;

    const employee = {
      firstName: firstName.value,
      lastName: lastName.value,
      age: +age.value,
      dateOfJoining: dateOfJoining.value,
      title: title.value,
      department: department.value,
      employeeType: employeeType.value,
    };

    this.props.handleResetFormErrors();
    const isFormValid = this.props.handleValidateFormData(employee);
    if (!isFormValid) return;

    this.props.handleEmployeeCreation(employee);
    e.target.reset();
  }

  render() {
    return (
      <section id="add-employee-container">
        <h1 className="section-header">Add a New Employee</h1>
        <form
          name="addEmployee"
          onSubmit={this.createEmployee.bind(this)}
          className="add-employee-form"
        >
          <label htmlFor="firstName">First Name</label>
          <input type="text" name="firstName" id="firstName" />
          <p className="errors">
            {this.props.hasErrors && this.props.formErrors.firstName}
          </p>

          <label htmlFor="lastName">Last Name</label>
          <input type="text" name="lastName" id="lastName" />
          <p className="errors">
            {this.props.hasErrors && this.props.formErrors.lastName}
          </p>

          <label htmlFor="age">Age</label>
          <input type="number" name="age" id="age" />
          <p className="errors">
            {this.props.hasErrors && this.props.formErrors.age}
          </p>

          <label htmlFor="dateOfJoining">Date of Joining</label>
          <input type="date" name="dateOfJoining" id="dateOfJoining" />
          <p className="errors">
            {this.props.hasErrors && this.props.formErrors.dateOfJoining}
          </p>

          <label htmlFor="title">Title</label>
          <select id="title" name="title">
            <option value="Employee">Employee</option>
            <option value="Manager">Manager</option>
            <option value="Director">Director</option>
            <option value="VP">VP</option>
          </select>
          <p className="errors">
            {this.props.hasErrors && this.props.formErrors.title}
          </p>

          <label htmlFor="department">Department</label>
          <select id="department" name="department">
            <option value="IT">IT</option>
            <option value="Marketing">Marketing</option>
            <option value="HR">HR</option>
            <option value="Engineering">Engineering</option>
          </select>
          <p className="errors">
            {this.props.hasErrors && this.props.formErrors.department}
          </p>

          <label htmlFor="employeeType">Employee Type</label>
          <select id="employeeType" name="employeeType">
            <option value="FullTime">Full Time</option>
            <option value="PartTime">Part Time</option>
            <option value="Contract">Contract</option>
            <option value="Seasonal">Seasonal</option>
          </select>
          <p className="errors">
            {this.props.hasErrors && this.props.formErrors.employeeType}
          </p>

          <input type="submit" value="Submit" className="create-employee-btn" />
        </form>
      </section>
    );
  }
}

const EmployeeRow = (props) => {
  const {
    firstName,
    lastName,
    age,
    dateOfJoining,
    title,
    department,
    employeeType,
    status,
  } = props.employeeDetails;

  return (
    <tr>
      <td>{props.index + 1}</td>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{age}</td>
      <td>{dateOfJoining}</td>
      <td>{title}</td>
      <td>{department}</td>
      <td>{employeeType.split(/\.?(?=[A-Z])/).join('-')}</td>
      <td>{status == 1 ? 'Working' : 'Retired'}</td>
    </tr>
  );
};

class EmployeeTable extends React.Component {
  render() {
    const employeesList = this.props.employeesList.map((employees, index) => (
      <EmployeeRow
        employeeDetails={employees}
        key={employees.id}
        index={index}
      />
    ));

    return (
      <section id="employee-list-container">
        <h1 className="section-header">Employees List</h1>
        <EmployeeSearch
          handleEmployeeFilter={(key, value) =>
            this.props.handleEmployeeFilter(key, value)
          }
        />

        <table className="employees-list">
          <thead>
            <tr>
              <th>S.N.</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Date of Joining</th>
              <th>Title</th>
              <th>Department</th>
              <th>Employee Type</th>
              <th>Current Status</th>
            </tr>
          </thead>
          <tbody>{employeesList}</tbody>
        </table>
      </section>
    );
  }
}

class EmployeeSearch extends React.Component {
  filterEmployeeList(e) {
    e.preventDefault();
    const { filterKeyword, fitlerParameter } = document.forms.filterForm;
    this.props.handleEmployeeFilter(fitlerParameter.value, filterKeyword.value);
  }

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
          onSubmit={this.filterEmployeeList.bind(this)}
        >
          <select
            name="fitlerParameter"
            id="fitlerParameter"
            onChange={this.resetForm.bind(this)}
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
            onChange={this.filterEmployeeList.bind(this)}
          />
        </form>
      </div>
    );
  }
}

class EmployeeDirectory extends React.Component {
  constructor() {
    super();
    this.state = {
      employeesList: [],
      tempEmployeeList: [],
      hasErrors: false,
      formErrors: { firstName: '', lastName: '', age: '', dateOfJoining: '' },
      filter: { key: '', value: '' },
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
      this.setState((prev) => ({
        ...prev,
        employeesList: data.employeesList,
        tempEmployeeList: data.employeesList,
      }));
    }
  }

  async saveEmployee(employee) {
    const query = `mutation saveEmployee($employee: UserInput!) {
      saveEmployee(employee: $employee) {
        id
      }
    }`;

    const data = await graphQLFetch(query, { employee });
    if (data) {
      this.getEmployeesList();
    }
  }

  componentDidMount() {
    this.getEmployeesList();
  }

  createEmployee(employee) {
    this.saveEmployee(employee);
    this.setState((prev) => ({
      ...prev,
      hasErrors: false,
    }));
  }

  resetFormErrors() {
    this.setState({ hasErrors: false, formErrors: {} });
  }

  validateFormData({ firstName, lastName, age, dateOfJoining }) {
    let isFormValid = true;
    if (!firstName) {
      isFormValid = false;
      this.setState((prev) => ({
        formErrors: { ...prev.formErrors, firstName: 'This field is required' },
        hasErrors: true,
      }));
    }

    if (!lastName) {
      isFormValid = false;
      this.setState((prev) => ({
        formErrors: { ...prev.formErrors, lastName: 'This field is required' },
        hasErrors: true,
      }));
    }

    if (!age) {
      isFormValid = false;
      this.setState((prev) => ({
        formErrors: { ...prev.formErrors, age: 'This field is required' },
        hasErrors: true,
      }));
    } else if (age < 20 || age > 70) {
      isFormValid = false;
      this.setState((prev) => ({
        formErrors: {
          ...prev.formErrors,
          age: 'Age must be between 20 and 70',
        },
        hasErrors: true,
      }));
    }

    if (!dateOfJoining) {
      isFormValid = false;
      this.setState((prev) => ({
        formErrors: {
          ...prev.formErrors,
          dateOfJoining: 'This field is required',
        },
        hasErrors: true,
      }));
    }
    return isFormValid;
  }

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

  render() {
    return (
      <>
        <EmployeeTable
          employeesList={this.state.tempEmployeeList}
          filter={this.state.filter}
          handleEmployeeFilter={(key, value) =>
            this.filterEmployeeList(key, value)
          }
        />
        <EmployeeCreate
          employeesList={this.state.tempEmployeeList}
          handleEmployeeCreation={(employee) => this.createEmployee(employee)}
          handleValidateFormData={this.validateFormData.bind(this)}
          handleResetFormErrors={this.resetFormErrors.bind(this)}
          formErrors={this.state.formErrors}
          hasErrors={this.state.hasErrors}
        />
      </>
    );
  }
}

const element = <EmployeeDirectory />;
ReactDOM.render(element, document.getElementById('root'));
