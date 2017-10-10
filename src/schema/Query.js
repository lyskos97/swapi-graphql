import { GraphQLObjectType, GraphQLInt, GraphQLNonNull, GraphQLList } from 'graphql';
import { loadData } from './utils';
import PersonType from './Person';
import PlanetType from './Planet';
import FilmType from './Film';

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    person: {
      type: PersonType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: (_, args) => loadData(`https://swapi.co/api/people/${args.id}/`),
    },
    people: {
      type: new GraphQLList(PersonType),
      args: {
        limit: { type: GraphQLInt, defaultValue: 5 },
      },
      resolve: async (source, args) => {
        const data = await loadData(`https://swapi.co/api/people/`);
        if (args && args.limit > 0) {
          return data.slice(0, args.limit);
        }
        return data;
      },
    },
    planets: {
      type: new GraphQLList(PlanetType),
      args: {
        limit: { type: GraphQLInt, defaultValue: 5 },
      },
      resolve: async (source, args) => {
        const data = await loadData(`https://swapi.co/api/planets/`);
        if (args && args.limit > 0) {
          return data.slice(0, args.limit);
        }
        return data;
      },
    },
    films: {
      type: new GraphQLList(FilmType),
      args: {
        limit: { type: GraphQLInt, defaultValue: 3 },
      },
      resolve: async (_, args) => {
        const data = await loadData(`https://swapi.co/api/films/`);
        if (args && args.limit > 0) {
          return data.slice(0, args.limit);
        }
        return data;
      },
    },
  }),
});

export default QueryType;
