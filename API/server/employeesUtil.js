const { insertUser, getUsersList } = require('./db');

// Get employees list from the DB
async function employeesList() {
  return getUsersList();
}

// Save an employee details to the DB
async function saveEmployee(_, { employee }) {
  const savedEmployee = await insertUser(employee);
  return savedEmployee;
}
module.exports = { employeesList, saveEmployee };