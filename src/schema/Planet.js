import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } from 'graphql';
import { loadBulk } from './utils';
import PersonType from './Person';
import FilmType from './Film';

const PlanetType = new GraphQLObjectType({
  name: 'Planet',
  description: 'One of the planets spotted in the series',
  fields: () => ({
    name: { type: GraphQLString },
    climate: { type: GraphQLString },
    rotation_period: { type: GraphQLString },
    orbital_period: { type: GraphQLString },
    diameter: { type: GraphQLString },
    gravity: { type: GraphQLString },
    terrain: { type: GraphQLString },
    surface_water: { type: GraphQLString },
    population: { type: GraphQLString },
    created: { type: GraphQLString },
    edited: { type: GraphQLString },
    url: { type: GraphQLString },
    residentUrls: {
      type: new GraphQLList(GraphQLString),
      resolve: source => source.residents,
    },
    filmUrls: {
      type: new GraphQLList(GraphQLString),
      resolve: source => source.films,
    },
    residents: {
      type: new GraphQLList(PersonType),
      args: {
        limit: { type: GraphQLInt, defaultValue: 5 },
      },
      resolve: (source, args) => {
        if (args && args.limit > 0) {
          return loadBulk(source.residents.slice(0, args.limit));
        }
        return loadBulk(source.residents);
      },
    },
    films: {
      type: new GraphQLList(FilmType),
      resolve: source => loadBulk(source.films),
    },
  }),
});

export default PlanetType;
