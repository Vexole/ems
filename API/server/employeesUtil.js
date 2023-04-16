/* eslint-disable no-restricted-syntax */
const {
  insertUser,
  getUsersList,
  getUserById,
  updateUser,
  deleteUser,
} = require('./db');

function getDateDifference(currentDate, retirementDate) {
  retirementDate.setHours(0, 0, 0, 0);
  currentDate.setHours(0, 0, 0, 0);
  const msPerDay = 24 * 60 * 60 * 1000;
  const diffInMs = retirementDate.getTime() - currentDate.getTime();
  const diffInDays = Math.floor(diffInMs / msPerDay);
  const years = Math.floor(diffInDays / 365);
  const remainingDays = diffInDays % 365;
  const months = Math.floor(remainingDays / 31);
  let days = remainingDays % 31;

  if (days !== 0) {
    days -= 1;
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
  const joiningYear = new Date(user.dateOfJoining).getFullYear();
  const currentDate = new Date();
  const remainingYear =
    65 - user.age - (currentDate.getFullYear() - joiningYear);
  const retirementDate = new Date(
    `${currentDate.getFullYear() + remainingYear}-12-31`
  );

  const { years, months, days } = getDateDifference(
    currentDate,
    retirementDate,
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

async function updateEmployee(_, { employee }) {
  return updateUser(employee);
}

async function deleteEmployee(_, { employeeId }) {
  const employee = await getUserById(employeeId);
  if (employee.status === 1) {
    return null;
  }
  return deleteUser(employeeId);
}

async function employeesListNearingRetirement(_, { employeeType }) {
  const filter = {};
  if (employeeType) filter.employeeType = employeeType;
  const usersList = await getUsersList(filter);
  console.log(filter);

  for (const user of usersList) {
    const joiningYear = new Date(user.dateOfJoining).getFullYear();
    const currentDate = new Date();
    const remainingYear = 65 - user.age - (currentDate.getFullYear() - joiningYear);

    const retirementDate = new Date(
      `${currentDate.getFullYear() + remainingYear}-12-31`,
    );

    const { years, months, days } = getDateDifference(
      currentDate,
      retirementDate,
    );

    user.retirementInfo = {
      days,
      months,
      years,
    };
  }

  return usersList.filter(
    (user) =>
      (user.retirementInfo.months <= 6 && user.retirementInfo.years === 0)
      || (user.retirementInfo.months === 0 && user.retirementInfo.years === 0),
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
