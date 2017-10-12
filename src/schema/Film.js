import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } from 'graphql';
import { loadBulk } from './utils';
import PersonType from './Person';
import PlanetType from './Planet';
import SpeciesType from './Species';
import StarshipsType from './Starship';
import VehicleType from './Vehicle';

const FilmType = new GraphQLObjectType({
  name: 'Film',
  fields: () => ({
    title: { type: GraphQLString },
    episode_id: { type: GraphQLInt },
    director: { type: GraphQLString },
    producer: { type: GraphQLString },
    release_date: { type: GraphQLString },
    created: { type: GraphQLString },
    edited: { type: GraphQLString },
    characterUrls: {
      type: new GraphQLList(GraphQLString),
      resolve: source => source.characters,
    },
    speciesUrls: {
      type: new GraphQLList(GraphQLString),
      resolve: source => source.species,
    },
    starshipUrls: {
      type: new GraphQLList(GraphQLString),
      resolve: source => source.starships,
    },
    planetUrls: {
      type: new GraphQLList(GraphQLString),
      resolve: source => source.planets,
    },
    vehicleUrls: {
      type: new GraphQLList(GraphQLString),
      resolve: source => source.vehicles,
    },
    opening_crawl: { type: GraphQLString },
    url: { type: GraphQLString },
    characters: {
      type: new GraphQLList(PersonType),
      args: {
        limit: { type: GraphQLInt, defaultValue: 5 },
      },
      resolve: (source, args) => {
        if (args && args.limit > 0) {
          return loadBulk(source.characters.slice(0, args.limit));
        }
        return loadBulk(source.characters);
      },
    },
    planets: {
      type: new GraphQLList(PlanetType),
      args: {
        limit: { type: GraphQLInt, defaultValue: 5 },
      },
      resolve: (source, args) => {
        if (args && args.limit > 0) {
          return loadBulk(source.planets.slice(0, args.limit));
        }
        return loadBulk(source.planets);
      },
    },
    species: {
      type: new GraphQLList(SpeciesType),
      args: {
        limit: { type: GraphQLInt, defaultValue: 5 },
      },
      resolve: (source, args) => {
        if (args && args.limit > 0) {
          return loadBulk(source.species.slice(0, args.limit));
        }
        return loadBulk(source.species);
      },
    },
    starships: {
      type: new GraphQLList(StarshipsType),
      args: {
        limit: { type: GraphQLInt, defaultValue: 5 },
      },
      resolve: (source, args) => {
        if (args && args.limit > 0) {
          return loadBulk(source.starships.slice(0, args.limit));
        }
        return loadBulk(source.starships);
      },
    },
    vechiles: {
      type: new GraphQLList(VehicleType),
      args: {
        limit: { type: GraphQLInt, defaultValue: 5 },
      },
      resolve: (source, args) => {
        if (args && args.limit > 0) {
          return loadBulk(source.vehicles.slice(0, args.limit));
        }
        return loadBulk(source.vehicles);
      },
    },
  }),
});

export default FilmType;
