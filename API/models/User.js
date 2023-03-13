const mongoose = require('mongoose');

// Model for users(employees)
const UserSchema = mongoose.Schema({
  id: { type: Number, requried: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
  dateOfJoining: { type: Date, required: true },
  title: { type: String, required: true },
  department: { type: String, required: true },
  employeeType: { type: String, required: true },
  status: { type: Number, required: true },
});

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;
