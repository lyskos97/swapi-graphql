import express from 'express';

import expressGraphQL from 'express-graphql';

import schema from './schema';

const app = express();
// app.all('/gra', (req, res) => res.redirect('/'));

app.use(
  '/',
  expressGraphQL(req => ({
    schema,
    rootValue: { a: 123, b: 567 },
    graphiql: true,
    context: req,
  }))
);

app.listen(4000, () => {
  console.log('Everything works on port 4000...');
});
