import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } from 'graphql';
import { loadBulk } from './utils';
import PersonType from './Person';
import PlanetType from './Planet';
import SpeciesType from './Species';

const FilmType = new GraphQLObjectType({
  name: 'Film',
  fields: () => ({
    title: { type: GraphQLString },
    episode_id: { type: GraphQLInt },
    director: { type: GraphQLString },
    characters: { type: new GraphQLList(GraphQLString) },
    charactersList: {
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
    planetsList: {
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
    species: { type: new GraphQLList(GraphQLString) },
    speciesList: {
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
  }),
});

export default FilmType;
