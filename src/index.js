import express from 'express';

const expressGraphQL = require('express-graphql');
const schema = require('./schema');

const app = express();

app.all('/graphql', (req, res) => res.redirect('/'));

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
