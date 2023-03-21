/* eslint-disable no-underscore-dangle */
const User = require('../models/User');
const { findByIdAndUpdate } = require('../models/User');

// Static employees list to seed the database
const employeesList = [
  {
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
  await User.insertMany(employeesList);
}

/*
 * Get the manually generated id for the new user, insert it in the DB, and
 * return the saved user
 */
async function insertUser(argUser) {
  const user = { ...argUser };
  const result = await User.create(user);
  const savedIssue = await User.findById(result._id);
  return savedIssue;
}

async function updateUser(argUser) {
  const updatedUser = await User.findByIdAndUpdate(argUser._id, argUser);
  console.log(updatedUser);
  return updatedUser._id;
}

// Get the list of all users(employees) from the DB
async function getUsersList() {
  return User.find({});
}

async function getUserById(argUserId) {
  return User.findById(argUserId);
}

async function deleteUser(argUserId) {
  const deletedUser = await User.findByIdAndDelete(argUserId);
  return deletedUser._id;
}

// Exporting the functions for use in other files
module.exports = {
  seedData,
  insertUser,
  updateUser,
  getUsersList,
  getUserById,
  deleteUser,
};
