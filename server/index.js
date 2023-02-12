require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const { ApolloServer } = require('apollo-server-express');
const { GraphQLScalarType } = require('graphql');
const { seedData, insertUser, getUsersList } = require('./db');

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

async function employeesList() {
  return await getUsersList();
}

async function saveEmployee(_, { employee }) {
  const savedEmployee = await insertUser(employee);
  return savedEmployee;
}

const resolvers = {
  Query: {
    employeesList,
  },
  Mutation: {
    saveEmployee,
  },
};
const server = new ApolloServer({
  typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
  resolvers,
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_DB_URL, { useNewUrlParser: true });

server.start().then((res) => {
  server.applyMiddleware({ app, path: '/graphql' });
});

const PORT = 4000;
(async function () {
  try {
    await seedData();
    app.listen(PORT, function () {
      console.log('App started on port 3000');
    });
  } catch (err) {
    console.log('ERROR:', err);
  }
})();
