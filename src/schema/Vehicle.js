import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql';
import { loadBulk } from './utils';
import PeopleType from './Person';
import FilmType from './Film';

const VehicleType = new GraphQLObjectType({
  name: 'Vehicle',
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
    vehicle_class: { type: GraphQLString },

    pilotsUrls: {
      type: new GraphQLList(GraphQLString),
      resolve: source => source.pilots,
    },
    pilots: {
      type: new GraphQLList(PeopleType),
      resolve: source => loadBulk(source.pilots),
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

export default VehicleType;
