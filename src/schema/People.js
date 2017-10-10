import { GraphQLObjectType, GraphQLString } from 'graphql';
import { loadData } from './utils';
import HomeworldType from './Homeworld';

const PeopleType = new GraphQLObjectType({
  name: 'People',
  fields: () => ({
    name: { type: GraphQLString },
    height: { type: GraphQLString },
    mass: { type: GraphQLString },
    hair_color: { type: GraphQLString },
    skin_color: { type: GraphQLString },
    eye_color: { type: GraphQLString },
    birth_year: { type: GraphQLString },
    gender: { type: GraphQLString },
    homeworld: { type: GraphQLString },
    homeworldObj: {
      type: HomeworldType,
      resolve: source => loadData(source.homeworld),
    },
    // films: { type: FilmsType },
    // species: { type: SpeciesType },
    // vehicles: { type: VehiclesType },
    // starships: { type: StarshipsType },
  }),
});

export default PeopleType;
