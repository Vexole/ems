const {
  insertUser,
  getUsersList,
  getUserById,
  updateUser,
  deleteUser,
} = require('./db');

// Get employees list from the DB
async function employeesList(_, { employeeType }) {
  const filter = {};
  if (employeeType) filter.employeeType = employeeType;
  return getUsersList(filter);
}

async function employeeById(_, { employeeId }) {
  return getUserById(employeeId);
}

// Save an employee details to the DB
async function saveEmployee(_, { employee }) {
  const savedEmployee = await insertUser(employee);
  return savedEmployee;
}

async function updateEmployee(_, { employee }) {
  return updateUser(employee);
}

async function deleteEmployee(_, { employeeId }) {
  return deleteUser(employeeId);
}

module.exports = {
  employeesList,
  employeeById,
  saveEmployee,
  updateEmployee,
  deleteEmployee,
};
