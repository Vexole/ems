const User = require('../models/User');
const Counter = require('../models/Counter');

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

async function seedData() {
  await User.deleteMany({});
  await Counter.deleteMany({});
  await User.insertMany(employeesList);
  await Counter.create({ _id: 'users', current: 4 });
}

async function getNextSequence(name) {
  const result = await Counter.findOneAndUpdate(
    { _id: name },
    { $inc: { current: 1 } },
    { returnOriginal: false }
  );
  return result.current;
}

async function insertUser(user) {
  user.id = await getNextSequence('users');
  const result = await User.create(user);
  const savedIssue = await User.findById(result._id);
  return savedIssue;
}

async function getUsersList() {
  const issues = await User.find({});
  return issues;
}

module.exports = { seedData, insertUser, getUsersList };
