import 'dotenv/config';
import express from 'express';
import expressGraphQL from 'express-graphql';
import { GraphQLString } from 'graphql';
import schema from './schema';
import Person from './schema/Person';
import { generateTypeFields } from './schema/utils';

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

/* const sorts = {
  URL_ASC: Symbol('URL_ASC'),
  URL_DESC: Symbol('URL_DESC'),
  NAME_ASC: Symbol('NAME_ASC'),
  NAME_DESC: Symbol('NAME_DESC'),
};
 */

console.log(`
http_proxy: ${process.env.http_proxy}
https_proxy: ${process.env.https_proxy}
ftp_proxy: ${process.env.ftp_proxy}
`);

generateTypeFields('https://swapi.co/api/planets/1/');

let fields = {};
generateTypeFields('https://swapi.co/api/people/1/').then(res => {
  fields = res;
});
console.log(Person.fields);
