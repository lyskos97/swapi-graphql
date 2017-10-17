/* flow */
import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql';
import { loadBulk } from './utils';
import PeopleType from './Person';
import FilmType from './Film';

const PlanetType = new GraphQLObjectType({
  name: 'Planet',
  fields: () => ({
    name: { type: GraphQLString },
    rotation_period: { type: GraphQLString },
    orbital_period: { type: GraphQLString },
    diameter: { type: GraphQLString },
    climate: { type: GraphQLString },
    gravity: { type: GraphQLString },
    terrain: { type: GraphQLString },
    surface_water: { type: GraphQLString },
    population: { type: GraphQLString },

    residentsUrls: {
      type: new GraphQLList(GraphQLString),
      resolve: source => source.residents,
    },
    residents: {
      type: new GraphQLList(PeopleType),
      resolve: source => loadBulk(source.residents),
    },

    filmsUrls: {
      type: new GraphQLList(GraphQLString),
      resolve: source => source.films,
    },
    films: {
      type: new GraphQLList(FilmType),
      resolve: source => loadBulk(source.films),
    },

    created: { type: GraphQLString },
    edited: { type: GraphQLString },
    url: { type: GraphQLString },
  }),
});

export default PlanetType;
