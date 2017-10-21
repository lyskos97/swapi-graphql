/* flow */
import { GraphQLObjectType } from 'graphql';
import { generateTypeFromJSON } from './utils';
import { person } from './swapi-objects';

const PersonType = new GraphQLObjectType(generateTypeFromJSON('Person', person));

/* 
const Person = new GraphQLObjectType({
  name: 'Person',
  fields: () => ({
    name: { type: GraphQLString },
    height: { type: GraphQLString },
    mass: { type: GraphQLString },
    hair_color: { type: GraphQLString },
    skin_color: { type: GraphQLString },
    eye_color: { type: GraphQLString },
    birth_year: { type: GraphQLString },
    gender: { type: GraphQLString },

    homeworldUrls: {
      type: GraphQLString,
      resolve: source => source.homeworld,
    },
    homeworld: {
      type: PlanetType,
      resolve: source => loadData(source.homeworld),
    },

    filmsUrls: {
      type: new GraphQLList(GraphQLString),
      resolve: source => source.films,
    },
    films: {
      type: new GraphQLList(FilmType),
      resolve: source => loadBulk(source.films),
    },

    speciesUrls: {
      type: new GraphQLList(GraphQLString),
      resolve: source => source.species,
    },
    species: {
      type: new GraphQLList(SpeciesType),
      resolve: source => loadBulk(source.species),
    },

    vehiclesUrls: {
      type: new GraphQLList(GraphQLString),
      resolve: source => source.vehicles,
    },
    vehicles: {
      type: new GraphQLList(VehicleType),
      resolve: source => loadBulk(source.vehicles),
    },

    starshipsUrls: {
      type: new GraphQLList(GraphQLString),
      resolve: source => source.starships,
    },
    starships: {
      type: new GraphQLList(StarshipType),
      resolve: source => loadBulk(source.starships),
    },

    created: { type: GraphQLString },
    edited: { type: GraphQLString },
    url: { type: GraphQLString },
  }),
});
 */

export default PersonType;
