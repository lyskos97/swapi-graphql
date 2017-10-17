/* flow */
import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } from 'graphql';
import PersonType from './Person';
import PlanetType from './Planet';
import VehicleType from './Vehicle';
import StarshipType from './Starship';
import SpeciesType from './Species';
import { loadBulk } from './utils';

const FilmType = new GraphQLObjectType({
  name: 'Film',
  fields: () => ({
    title: { type: GraphQLString },
    episode_id: { type: GraphQLInt },
    opening_crawl: { type: GraphQLString },
    director: { type: GraphQLString },
    producer: { type: GraphQLString },
    release_date: { type: GraphQLString },

    charactersUrls: {
      type: new GraphQLList(GraphQLString),
      resolve: source => source.characters,
    },
    characters: {
      type: new GraphQLList(PersonType),
      resolve: source => loadBulk(source.characters),
    },

    planetsUrls: {
      type: new GraphQLList(GraphQLString),
      resolve: source => source.planets,
    },
    planets: {
      type: new GraphQLList(PlanetType),
      resolve: source => loadBulk(source.planets),
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

    speciesUrls: {
      type: new GraphQLList(GraphQLString),
      resolve: source => source.species,
    },
    species: {
      type: new GraphQLList(SpeciesType),
      resolve: source => loadBulk(source.species),
    },

    created: { type: GraphQLString },
    edited: { type: GraphQLString },
    url: { type: GraphQLString },
  }),
});

export default FilmType;
