// Regex to validate the user input
const nameRegex = /^[A-Za-z]{3,}$/;

// Validate the user entered inputs, and set error messages if exists
export default function validateFormData({
  firstName,
  lastName,
  age,
  dateOfJoining,
}) {
  let isFormValid = true;
  if (!firstName) {
    isFormValid = false;
    this.setError('firstName');
  } else if (!nameRegex.test(firstName)) {
    isFormValid = false;
    this.setError(
      'firstName',
      'Must be at least 3 characters. Cannot contain number, space or special characters',
    );
  }

  if (!lastName) {
    isFormValid = false;
    this.setError('lastName');
  } else if (!nameRegex.test(lastName)) {
    isFormValid = false;
    this.setError(
      'lastName',
      'Must be at least 3 characters. Cannot contain number, space or special characters',
    );
  }

  if (!age) {
    isFormValid = false;
    this.setError('age');
  } else if (Number.isNaN(age) || age < 20 || age > 70) {
    isFormValid = false;
    this.setError('age', 'Age must be between 20 and 70');
  }

  if (!dateOfJoining) {
    isFormValid = false;
    this.setError('dateOfJoining');
  } else if (!dateOfJoining.match(/^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/)) {
    isFormValid = false;
    this.setError('dateOfJoining', 'Invalid date format');
  }
  return isFormValid;
}
