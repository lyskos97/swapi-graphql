import express from 'express';
import expressGraphQL from 'express-graphql';
import schema from './schema';
// import { loadData } from './schema/utils';

const app = express();
const port = 3000;

app.use(
  '/',
  expressGraphQL({
    schema,
    graphiql: true,
  })
);

app.listen(port, () => {
  console.log(`Everything works on port ${port}...`);
});
