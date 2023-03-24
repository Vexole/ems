const saveEmployeeQuery = `mutation saveEmployee($employee: UserInput!) {
    saveEmployee(employee: $employee) {
      _id
    }
  }`;

const employeeListQuery = `query EmployeesList($employeeType: EmployeeType) {
    employeesList(employeeType: $employeeType) {
      _id
      firstName
      lastName
      age
      dateOfJoining
      title
      department
      employeeType
      status
    }
  }`;
const employeeByIdQuery = `query EmployeeById($employeeId: ID!) {
    employeeById(employeeId: $employeeId) {
      _id firstName lastName age dateOfJoining title department employeeType status
    }
  }`;

const updateEmployeeByIdQuery = `mutation UpdateEmployee($employee: UserUpdate!) {
    updateEmployee(employee: $employee)
  }`;

const deleteEmployeeByIdQuery = `mutation DeleteEmployee($employeeId: ID!) {
    deleteEmployee(employeeId: $employeeId) {
      _id
    }
  }`;

module.exports = {
  saveEmployeeQuery,
  employeeListQuery,
  employeeByIdQuery,
  updateEmployeeByIdQuery,
  deleteEmployeeByIdQuery,
};