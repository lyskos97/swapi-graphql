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

/* const k = async (pages = 9) => {
  const fullData = {};
  for (let i = 1; i < pages + 1; i++) {
    const data = loadData(`https://swapi.co/api/people/?page=${i}`);
    console.log(data);
    Object.assign(fullData, data);
  }
  console.log(fullData, '+ kek');
};

k();

 */
