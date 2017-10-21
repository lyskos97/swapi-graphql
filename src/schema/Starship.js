/* @flow */
import { GraphQLObjectType } from 'graphql';
import { generateTypeFromJSON } from './utils';
import { starship } from './swapi-objects';

const StarshipType = new GraphQLObjectType(generateTypeFromJSON('Starship', starship));

/* 
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
 */

export default StarshipType;
