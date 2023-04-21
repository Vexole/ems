/* eslint-disable comma-dangle */
/* eslint-disable operator-linebreak */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-restricted-syntax */
const {
  insertUser,
  getUsersList,
  getUserById,
  updateUser,
  deleteUser,
} = require('./db');

/*
 * Get the difference between two dates provided and
 * return the difference in days, months, and years.
 */
function getDateDifference(currentDate, retirementDate) {
  retirementDate.setHours(0, 0, 0, 0);
  currentDate.setHours(0, 0, 0, 0);
  const msPerDay = 24 * 60 * 60 * 1000;
  const diffInMs = retirementDate.getTime() - msPerDay - currentDate.getTime();
  const diffInDays = Math.floor(diffInMs / msPerDay);
  let years = Math.floor(diffInDays / 365);
  const remainingDays = diffInDays % 365;
  let months = Math.floor(remainingDays / 31);
  let days = remainingDays % 31;

  if (days < 0 || months < 0 || years < 0) {
    days = 0;
    months = 0;
    years = 0;
  }

  return { years, months, days };
}

// Get employees list from the DB
async function employeesList(_, { employeeType }) {
  const filter = {};
  if (employeeType) filter.employeeType = employeeType;
  const usersList = await getUsersList(filter);
  for (const user of usersList) {
    user.retirementInfo = { days: 0, months: 0, years: 0 };
  }
  return usersList;
}

async function employeeById(_, { employeeId }) {
  const user = await getUserById(employeeId);
  const joiningDate = new Date(user.dateOfJoining);
  const joiningYear = joiningDate.getFullYear();
  const currentDate = new Date();
  const remainingYear =
    65 - user.age - (currentDate.getFullYear() - joiningYear);
  let retirementDate = new Date(user.dateOfJoining);
  retirementDate = new Date(
    retirementDate.setFullYear(currentDate.getFullYear() + remainingYear)
  );
  retirementDate = new Date(
    retirementDate.setDate(retirementDate.getDate() - 1)
  );
  const { years, months, days } = getDateDifference(
    currentDate,
    retirementDate
  );

  user.retirementInfo = {
    days,
    months,
    years,
  };
  return user;
}

// Save an employee details to the DB
async function saveEmployee(_, { employee }) {
  const savedEmployee = await insertUser(employee);
  return savedEmployee;
}

// Update the employee detail
async function updateEmployee(_, { employee }) {
  return updateUser(employee);
}

// Delete the employee detail
async function deleteEmployee(_, { employeeId }) {
  const employee = await getUserById(employeeId);
  if (employee.status === 1) {
    return null;
  }
  return deleteUser(employeeId);
}

/*
 * Get list of all employees nearing retirement
 * where difference between current date and retirement date is < 6 months
 */
async function employeesListNearingRetirement(_, { employeeType }) {
  const filter = {};
  if (employeeType) filter.employeeType = employeeType;
  const usersList = await getUsersList(filter);

  for (const user of usersList) {
    const joiningDate = new Date(user.dateOfJoining);
    const joiningYear = joiningDate.getFullYear();
    const currentDate = new Date();
    const remainingYear =
      65 - user.age - (currentDate.getFullYear() - joiningYear);

    let retirementDate = new Date(user.dateOfJoining);
    retirementDate = new Date(
      retirementDate.setFullYear(currentDate.getFullYear() + remainingYear)
    );
    retirementDate = new Date(
      retirementDate.setDate(retirementDate.getDate() - 1)
    );

    const { years, months, days } = getDateDifference(
      currentDate,
      retirementDate
    );

    user.retirementInfo = {
      days,
      months,
      years,
    };
  }

  const filteredUsers = usersList.filter(
    (user) =>
      (user.retirementInfo.months <= 6 && user.retirementInfo.years === 0) ||
      (user.retirementInfo.months === 0 && user.retirementInfo.years === 0)
  );

  // If user has already retired, set the difference in days, months, years to 0
  return filteredUsers.filter(
    (user) =>
      !(
        user.retirementInfo.months === 0 &&
        user.retirementInfo.years === 0 &&
        user.retirementInfo.days === 0
      )
  );
}

module.exports = {
  employeesList,
  employeeById,
  saveEmployee,
  updateEmployee,
  deleteEmployee,
  employeesListNearingRetirement,
};
