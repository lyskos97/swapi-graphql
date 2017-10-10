import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } from 'graphql';
import { loadBulk } from './utils';
import PersonType from './Person';
import FilmType from './Film';

const StarshipType = new GraphQLObjectType({
  name: 'Starship',
  fields: () => ({
    name: { type: GraphQLString },
    model: { type: GraphQLString },
    manufacturer: { type: GraphQLString },
    pilots: { type: new GraphQLList(GraphQLString) },
    pilotsList: {
      type: new GraphQLList(PersonType),
      args: {
        limit: { type: GraphQLInt, defaultValue: 5 },
      },
      resolve: (source, args) => {
        if (args && args.limit > 0) {
          return loadBulk(source.pilots.slice(0, args.limit));
        }
        return loadBulk(source.pilots);
      },
    },
    films: { type: new GraphQLList(GraphQLString) },
    filmsObjArr: {
      type: new GraphQLList(FilmType),
      resolve: source => loadBulk(source.films),
    },
  }),
});

export default StarshipType;
