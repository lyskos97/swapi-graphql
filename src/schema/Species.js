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
    language: { type: GraphQLString },
    people: { type: new GraphQLList(GraphQLString) },
    peopleList: {
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
    films: { type: new GraphQLList(GraphQLString) },
    filmsObjArr: {
      type: new GraphQLList(FilmType),
      resolve: source => loadBulk(source.films),
    },
    homeworld: { type: GraphQLString },
    homeworldObj: {
      type: PlanetType,
      resolve: source => loadData(source.homeworld),
    },
  }),
});

export default SpeciesType;
