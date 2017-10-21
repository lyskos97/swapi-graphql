/* @flow */
import express from 'express';
import expressGraphQL from 'express-graphql';
import schema from './schema';
// import { generateTypeFromJSON } from './schema/utils';
// import { person } from './schema/swapi-objects';

const app = express();

app.use(
  '/',
  expressGraphQL(() => ({
    schema,
    graphiql: true,
  }))
);

app.listen(3000, () => {
  console.log('Everything works on port 3000...');
});

// console.log(generateTypeFromJSON('Person', person));
