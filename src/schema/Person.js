import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql';
import { loadData, loadBulk } from './utils';
import PlanetType from './Planet';
import FilmType from './Film';
import SpeciesType from './Species';
import VehicleType from './Vehicle';
import StarshipType from './Starship';

const PersonType = new GraphQLObjectType({
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
    homeworld: { type: GraphQLString },
    homeworldObj: {
      type: PlanetType,
      resolve: source => loadData(source.homeworld),
    },
    films: { type: new GraphQLList(GraphQLString) },
    filmsObjArr: {
      type: new GraphQLList(FilmType),
      resolve: source => loadBulk(source.films),
    },
    species: { type: new GraphQLList(GraphQLString) },
    speciesList: {
      type: new GraphQLList(SpeciesType),
      resolve: source => loadBulk(source.species),
    },
    vehicles: { type: new GraphQLList(GraphQLString) },
    vehiclesList: {
      type: new GraphQLList(VehicleType),
      resolve: source => loadBulk(source.vehicles),
    },
    starships: { type: new GraphQLList(GraphQLString) },
    starshipsList: {
      type: new GraphQLList(StarshipType),
      resolve: source => loadBulk(source.starships),
    },
  }),
});

export default PersonType;
