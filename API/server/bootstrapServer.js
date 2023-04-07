const fs = require('fs');
const { ApolloServer } = require('apollo-server-express');
const {
  employeesList,
  employeeById,
  saveEmployee,
  updateEmployee,
  deleteEmployee,
  employeesListNearingRetirement,
} = require('./employeesUtil');
const { GraphQLDate } = require('./graphqlDateType');

// Resolvers to retrieve the employees list and save an employee
const resolvers = {
  Query: {
    employeesList,
    employeeById,
    employeesListNearingRetirement,
  },
  Mutation: {
    saveEmployee,
    updateEmployee,
    deleteEmployee,
  },
  GraphQLDate,
};

// Configure the ApolloServer by reading the typeDefs from the schema.graphql file
const server = new ApolloServer({
  typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
  resolvers,
  formatError: (error) => {
    console.log(error);
    return error;
  },
});

/*
 * Start the GraphQL server, apply the middleware, and seed the database with
 * default dummy values
 */
function configureServer(app) {
  server.start().then(() => {
    const enableCors = (process.env.ENABLE_CORS || 'true') === 'true';
    server.applyMiddleware({ app, path: '/graphql', cors: enableCors });
  });
}

module.exports = { configureServer };
