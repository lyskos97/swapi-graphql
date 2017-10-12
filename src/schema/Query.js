import { GraphQLObjectType, GraphQLInt, GraphQLNonNull, GraphQLList } from 'graphql';
import { loadData } from './utils';
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
    people: {
      type: new GraphQLList(PersonType),
      args: {
        limit: { type: GraphQLInt, defaultValue: 5 },
        offset: { type: GraphQLInt, defaultValue: 0 },
      },
      resolve: async (source, args) => {
        const data = await loadData(`https://swapi.co/api/people/`);
        if (args && args.limit > 0 && args.offset >= 0) {
          return data.slice(args.offset, args.limit + args.offset);
        }
        return data;
      },
    },
    planet: {
      type: PlanetType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: (_, args) => loadData(`https://swapi.co/api/planets/${args.id}/`),
    },
    planets: {
      type: new GraphQLList(PlanetType),
      args: {
        limit: { type: GraphQLInt, defaultValue: 5 },
      },
      resolve: async (source, args) => {
        const data = await loadData(`https://swapi.co/api/planets/`);
        if (args && args.limit > 0) {
          return data.slice(0, args.limit);
        }
        return data;
      },
    },
    film: {
      type: FilmType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: (_, args) => loadData(`https://swapi.co/api/films/${args.id}/`),
    },
    films: {
      type: new GraphQLList(FilmType),
      args: {
        limit: { type: GraphQLInt, defaultValue: 3 },
      },
      resolve: async (_, args) => {
        const data = await loadData(`https://swapi.co/api/films/`);
        if (args && args.limit > 0) {
          return data.slice(0, args.limit);
        }
        return data;
      },
    },
    singleSpecies: {
      type: SpeciesType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: (_, args) => loadData(`https://swapi.co/api/species/${args.id}/`),
    },
    species: {
      type: new GraphQLList(SpeciesType),
      args: {
        limit: { type: GraphQLInt, defaultValue: 3 },
      },
      resolve: async (_, args) => {
        const data = await loadData(`https://swapi.co/api/species/`);
        if (args && args.limit > 0) {
          return data.slice(0, args.limit);
        }
        return data;
      },
    },
    starship: {
      type: StartshipType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: (_, args) => loadData(`https://swapi.co/api/starships/${args.id}/`),
    },
    starships: {
      type: new GraphQLList(StartshipType),
      args: {
        limit: { type: GraphQLInt, defaultValue: 3 },
      },
      resolve: async (_, args) => {
        const data = await loadData(`https://swapi.co/api/starships/`);
        if (args && args.limit > 0) {
          return data.slice(0, args.limit);
        }
        return data;
      },
    },
    vehicle: {
      type: VehicleType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: (_, args) => loadData(`https://swapi.co/api/vehicles/${args.id}/`),
    },
    vehicles: {
      type: new GraphQLList(VehicleType),
      args: {
        limit: { type: GraphQLInt, defaultValue: 3 },
      },
      resolve: async (_, args) => {
        const data = await loadData(`https://swapi.co/api/vehicles/`);
        if (args && args.limit > 0) {
          return data.slice(0, args.limit);
        }
        return data;
      },
    },
  }),
});

export default QueryType;
