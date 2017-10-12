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
    cost_in_credits: { type: GraphQLString },
    length: { type: GraphQLString },
    max_atmosphering_speed: { type: GraphQLString },
    crew: { type: GraphQLString },
    passengers: { type: GraphQLString },
    cargo_capacity: { type: GraphQLString },
    consumables: { type: GraphQLString },
    hyperdrive_rating: { type: GraphQLString },
    MGLT: { type: GraphQLString },
    starship_class: { type: GraphQLString },
    created: { type: GraphQLString },
    edited: { type: GraphQLString },
    url: { type: GraphQLString },
    pilotUrls: {
      type: new GraphQLList(GraphQLString),
      resolve: source => source.pilots,
    },
    filmUrls: {
      type: new GraphQLList(GraphQLString),
      resolve: source => source.films,
    },
    pilots: {
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
    films: {
      type: new GraphQLList(FilmType),
      resolve: source => loadBulk(source.films),
    },
  }),
});

export default StarshipType;
