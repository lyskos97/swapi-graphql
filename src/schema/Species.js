import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } from 'graphql';
import { loadBulk, loadData } from './utils';
import PersonType from './Person';
import FilmType from './Film';
import PlanetType from './Planet';

const SpeciesType = new GraphQLObjectType({
  name: 'Species',
  fields: () => ({
    name: { type: GraphQLString },
    classification: { type: GraphQLString },
    designation: { type: GraphQLString },
    average_height: { type: GraphQLString },
    skin_colors: { type: GraphQLString },
    hair_colors: { type: GraphQLString },
    eye_colors: { type: GraphQLString },
    average_lifespan: { type: GraphQLString },
    language: { type: GraphQLString },
    created: { type: GraphQLString },
    edited: { type: GraphQLString },
    url: { type: GraphQLString },
    characterUrls: {
      type: GraphQLString,
      resolve: source => source.homeworld,
    },
    peopleUrls: {
      type: new GraphQLList(GraphQLString),
      resolve: source => source.people,
    },
    filmUrls: {
      type: new GraphQLList(GraphQLString),
      resolve: source => source.films,
    },
    people: {
      type: new GraphQLList(PersonType),
      args: {
        limit: { type: GraphQLInt, defaultValue: 5 },
      },
      resolve: (source, args) => {
        if (args && args.limit > 0) {
          return loadBulk(source.people.slice(0, args.limit));
        }
        return loadBulk(source.people);
      },
    },
    films: {
      type: new GraphQLList(FilmType),
      resolve: source => loadBulk(source.films),
    },
    homeworld: {
      type: PlanetType,
      resolve: source => loadData(source.homeworld),
    },
  }),
});

export default SpeciesType;
