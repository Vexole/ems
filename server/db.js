const User = require('../models/User');
const Counter = require('../models/Counter');

// Static employees list to seed the database
const employeesList = [
  {
    id: 1,
    firstName: 'Bhupesh',
    lastName: 'Shrestha',
    age: 28,
    dateOfJoining: new Date('2022-06-06'),
    title: 'Employee',
    department: 'IT',
    employeeType: 'FullTime',
    status: 1,
  },
  {
    id: 2,
    firstName: 'John',
    lastName: 'Doe',
    age: 35,
    dateOfJoining: new Date('2022-06-06'),
    title: 'Employee',
    department: 'Marketing',
    employeeType: 'Contract',
    status: 0,
  },
  {
    id: 3,
    firstName: 'Jane',
    lastName: 'Smith',
    age: 58,
    dateOfJoining: new Date('2022-06-06'),
    title: 'Manager',
    department: 'HR',
    employeeType: 'FullTime',
    status: 1,
  },
];

/*
 * Start the app in the pristine state by deleting the db data.
 * Insert the starting data in the DB
 */
async function seedData() {
  await User.deleteMany({});
  await Counter.deleteMany({});
  await User.insertMany(employeesList);
  await Counter.create({ _id: 'users', current: 3 });
}

// Get the countrer from the collection, increment by one, and return the current value
async function getNextSequence(name) {
  const result = await Counter.findOneAndUpdate(
    { _id: name },
    { $inc: { current: 1 } },
    { returnOriginal: false }
  );
  return result.current;
}

/* 
 * Get the manually generated id for the new user, insert it in the DB, and
 * return the saved user 
 */
async function insertUser(user) {
  user.id = await getNextSequence('users');
  const result = await User.create(user);
  const savedIssue = await User.findById(result._id);
  return savedIssue;
}

// Get the list of all users(employees) from the DB
async function getUsersList() {
  const issues = await User.find({});
  return issues;
}

// Exporting the functions for use in other files
module.exports = { seedData, insertUser, getUsersList };
