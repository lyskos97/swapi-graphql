import { GraphQLObjectType } from 'graphql';
import { createFCList, createFC } from './utils';
import PersonType from './Person';
import PlanetType from './Planet';
import FilmType from './Film';
import SpeciesType from './Species';
import StarshipType from './Starship';
import VehicleType from './Vehicle';

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root query',
  fields: () => ({
    person: createFC({
      type: PersonType,
      url: 'https://swapi.co/api/people/',
    }),
    people: createFCList({
      type: PersonType,
      url: 'https://swapi.co/api/people/',
    }),
    planet: createFC({
      type: PlanetType,
      url: 'https://swapi.co/api/planets/',
    }),
    planets: createFCList({
      type: PlanetType,
      url: 'https://swapi.co/api/planets/',
    }),
    film: createFC({
      type: FilmType,
      url: 'https://swapi.co/api/films/',
    }),
    films: createFCList({
      type: FilmType,
      url: 'https://swapi.co/api/films/',
    }),
    speciesOne: createFC({
      type: SpeciesType,
      url: 'https://swapi.co/api/species/',
    }),
    species: createFCList({
      type: SpeciesType,
      url: 'https://swapi.co/api/species/',
    }),
    starship: createFC({
      type: StarshipType,
      url: 'https://swapi.co/api/starships/',
    }),
    starships: createFCList({
      type: StarshipType,
      url: 'https://swapi.co/api/starships/',
    }),
    vehicle: createFC({
      type: VehicleType,
      url: 'https://swapi.co/api/vehicles/',
    }),
    vehicles: createFCList({
      type: VehicleType,
      url: 'https://swapi.co/api/vehicles/',
    }),
  }),
});

export default QueryType;
