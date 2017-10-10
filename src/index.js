import express from 'express';
import expressGraphQL from 'express-graphql';
import schema from './schema';

const app = express();

app.use(
  '/',
  expressGraphQL({
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log('Everything works on port 4000...');
});
