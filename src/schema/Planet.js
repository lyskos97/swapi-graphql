import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } from 'graphql';
import { loadBulk } from './utils';
import PersonType from './Person';
import FilmType from './Film';

const PlanetType = new GraphQLObjectType({
  name: 'Planet',
  fields: () => ({
    name: { type: GraphQLString },
    climate: { type: GraphQLString },
    residents: { type: new GraphQLList(GraphQLString) },
    residentList: {
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
    films: { type: new GraphQLList(GraphQLString) },
    filmsObjArr: {
      type: new GraphQLList(FilmType),
      resolve: source => loadBulk(source.films),
    },
  }),
});

export default PlanetType;
