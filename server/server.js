require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const { ApolloServer } = require('apollo-server-express');
const { GraphQLScalarType } = require('graphql');
const { seedData, insertUser, getUsersList } = require('./db');

// Scalar type date defined with the serialize and parse methods
const GraphQLDate = new GraphQLScalarType({
  name: 'GraphQLDate',
  description: 'A Date() type in GraphQL as a scalar',
  serialize(value) {
    return value.toISOString();
  },
  parseValue(value) {
    const dateValue = new Date(value);
    return isNaN(dateValue) ? undefined : dateValue;
  },
  parseLiteral(ast) {
    if (ast.kind == Kind.STRING) {
      const value = new Date(ast.value);
      return isNaN(value) ? undefined : value;
    }
  },
});

// Get employees list from the DB
async function employeesList() {
  return await getUsersList();
}

// Save an employee details to the DB
async function saveEmployee(_, { employee }) {
  const savedEmployee = await insertUser(employee);
  return savedEmployee;
}

// Resolvers to retrieve the employees list and save an employee
const resolvers = {
  Query: {
    employeesList,
  },
  Mutation: {
    saveEmployee,
  },
};

// Configure the ApolloServer by reading the typeDefs from the schema.graphql file
const server = new ApolloServer({
  typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
  resolvers,
});

/*
 * Instantiate the express app, and configure the middleware for it, and
 * Make connection to the MongoDB
 */
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_DB_URL, { useNewUrlParser: true });

/*
 * Start the GraphQL server, apply the middleware, and seed the database with
 * default dummy values
 */
server.start().then((res) => {
  server.applyMiddleware({ app, path: '/graphql' });
  app.listen({ port: 4000 }, async () => {
    console.log(`GraphQL started on port 4000`);
    try {
      await seedData();
    } catch (err) {
      console.log('ERROR:', err);
    }
  });
});

const PORT = 3000;
app.listen(PORT, function () {
  console.log(`App started on port ${PORT}`);
});
