/* eslint-disable no-undef */
/* eslint-disable no-alert */
const dateRegex = /^\d\d\d\d-\d\d-\d\d/;

// Parse the date retrieved from the API
function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return value.split('T')[0];
  return value;
}

/*
 * Method to use prepared statements for API calls, and
 * Check for errors when making the API call
 */
export default async function graphQLFetch(query, variables = {}) {
  try {
    const response = await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
    });
    const body = await response.text();
    const result = JSON.parse(body, jsonDateReviver);
    if (result.errors) {
      const error = result.errors[0];
      if (error.extensions.code === 'BAD_USER_INPUT') {
        const details = error.extensions.exception.errors.join('\n ');
        alert(`${error.message}:\n ${details}`);
      } else {
        alert(`${error.extensions.code}: ${error.message}`);
      }
    }
    return result.data;
  } catch (e) {
    alert(`Error in sending data to server: ${e.message}`);
    return undefined;
  }
}
