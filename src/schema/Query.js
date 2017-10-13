import { GraphQLObjectType, GraphQLInt, GraphQLNonNull } from 'graphql';
import { loadData, createFCList } from './utils';
import PersonType from './Person';
import PlanetType from './Planet';
import FilmType from './Film';
import SpeciesType from './Species';
import StartshipType from './Starship';
import VehicleType from './Vehicle';

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    person: {
      type: PersonType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: (_, args) => loadData(`https://swapi.co/api/people/${args.id}/`),
    },
    people: createFCList({
      type: PersonType,
      url: 'https://swapi.co/api/people/',
    }),
    planet: {
      type: PlanetType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: (_, args) => loadData(`https://swapi.co/api/planets/${args.id}/`),
    },
    planets: createFCList({
      type: PlanetType,
      url: 'https://swapi.co/api/planets/',
    }),
    film: {
      type: FilmType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: (_, args) => loadData(`https://swapi.co/api/films/${args.id}/`),
    },
    films: createFCList({
      type: FilmType,
      url: 'https://swapi.co/api/films/',
    }),
    singleSpecies: {
      type: SpeciesType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: (_, args) => loadData(`https://swapi.co/api/species/${args.id}/`),
    },
    species: createFCList({
      type: SpeciesType,
      url: 'https://swapi.co/api/species/',
    }),
    starship: {
      type: StartshipType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: (_, args) => loadData(`https://swapi.co/api/starships/${args.id}/`),
    },
    starships: createFCList({
      type: StartshipType,
      url: 'https://swapi.co/api/starships/',
    }),
    vehicle: {
      type: VehicleType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: (_, args) => loadData(`https://swapi.co/api/vehicles/${args.id}/`),
    },
    vehicles: createFCList({
      type: VehicleType,
      url: 'https://swapi.co/api/vehicles/',
    }),
  }),
});

export default QueryType;
