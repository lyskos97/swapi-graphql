import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql';
import { loadBulk, loadData } from './utils';
import PeopleType from './Person';
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

    homeworldUrls: {
      type: GraphQLString,
      resolve: source => source.homeworld,
    },
    homeworld: {
      type: PlanetType,
      resolve: source => loadData(source.homeworld),
    },

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

export default SpeciesType;
