const {
  insertUser,
  getUsersList,
  getUserById,
  updateUser,
  deleteUser,
} = require('./db');

// Get employees list from the DB
async function employeesList() {
  return getUsersList();
}

async function getEmployeeById(argEmployeeId) {
  return getUserById(argEmployeeId);
}

// Save an employee details to the DB
async function saveEmployee(_, { employee }) {
  const savedEmployee = await insertUser(employee);
  return savedEmployee;
}

async function updateEmployee(_, { employee }) {
  return updateUser(employee);
}

async function deleteEmployee(argEmployeeId) {
  return deleteUser(argEmployeeId);
}

module.exports = {
  employeesList,
  getEmployeeById,
  saveEmployee,
  updateEmployee,
  deleteEmployee,
};
