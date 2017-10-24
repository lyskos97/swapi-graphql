/* @flow */
import express from 'express';
import expressGraphQL from 'express-graphql';
import schema from './schema';
import { toAPIType } from './schema/utils';

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

// console.dir(toAPIType('people'));
