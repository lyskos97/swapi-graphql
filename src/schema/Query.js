/* flow */
import { GraphQLObjectType } from 'graphql';
import { createFCList, createFCItem, TypesAndUrls } from './utils';

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    people: createFCList({ ...TypesAndUrls.Person }),
    person: createFCItem({ ...TypesAndUrls.Person }),

    homeworlds: createFCList({ ...TypesAndUrls.Planet }),
    homeworld: createFCItem({ ...TypesAndUrls.Planet }),

    films: createFCList({ ...TypesAndUrls.Film }),
    film: createFCItem({ ...TypesAndUrls.Film }),

    species: createFCList({ ...TypesAndUrls.Species }),
    speciesOne: createFCItem({ ...TypesAndUrls.Species }),

    starships: createFCList({ ...TypesAndUrls.Starship }),
    starship: createFCItem({ ...TypesAndUrls.Starship }),

    vehicles: createFCList({ ...TypesAndUrls.Vehicle }),
    vehicle: createFCItem({ ...TypesAndUrls.Vehicle }),
  }),
});
export default QueryType;
