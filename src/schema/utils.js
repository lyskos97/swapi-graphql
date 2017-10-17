/* @flow */

import { GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLEnumType } from 'graphql';
import type { GraphQLObjectType } from 'graphql';
import fetch from 'node-fetch';
// import HttpsProxyAgent from 'https-proxy-agent';
import PersonType from './Person';
import PlanetType from './Planet';
import FilmType from './Film';
import SpeciesType from './Species';
import VehicleType from './Vehicle';
import StarshipType from './Starship';

export async function loadData(url: string) {
  const res = await fetch(url, {
    // agent: new HttpsProxyAgent(process.env.http_proxy || 'http://10.8.128.1:3128'),
  });
  const data = await res.json();
  if (data && data.count && data.results) {
    return data.results;
  }
  return data;
}

function isNumber(str) {
  if (Number.isNaN(parseInt(str, 10))) return false;
  return true;
}

export function createResolverFindListByUrl(url: string) {
  // TODO sort
  return async (source: Object, args: Object) => {
    let data = await loadData(url);
    if (args) {
      if (args.orderBy) {
        try {
          data = data.sort(args.orderBy);
        } catch (e) {
          throw new Error('Sorting method is weak and has an Error');
        }
      }

      if (args.offset) {
        data = data.slice(args.offset);
      }
      if (args.limit) {
        data = data.slice(0, args.limit);
      }
    }
    return data;
  };
}

export const SortEnumType = new GraphQLEnumType({
  name: 'SortEnumType',
  description: 'Sort value',
  values: {
    ID_ASC: {
      description: "Monkey sorting by id, don't do like this",
      value: (aObj, bObj) => {
        const a = aObj.url.split('/').slice(-2)[0];
        const b = bObj.url.split('/').slice(-2)[0];
        if (isNumber(a) && isNumber(b)) {
          return parseInt(a, 10) - parseInt(b, 10);
        }
        if (a > b) return 1;
        else if (a < b) return -1;
        return 0;
      },
    },
    ID_DESC: {
      value: (bObj, aObj) => {
        const a = aObj.url.split('/').slice(-2)[0];
        const b = bObj.url.split('/').slice(-2)[0];
        if (isNumber(a) && isNumber(b)) {
          return parseInt(a, 10) - parseInt(b, 10);
        }
        if (a > b) return 1;
        else if (a < b) return -1;
        return 0;
      },
    },
  },
});

type CreateFCListOpts = { type: GraphQLObjectType, url: string };

export function createFCList({ type, url }: CreateFCListOpts) {
  return {
    type: new GraphQLList(type),
    args: {
      limit: { type: GraphQLInt, defaultValue: 3 },
      offset: { type: GraphQLInt, defaultValue: 0 },
      orderBy: { type: SortEnumType },
    },
    resolve: createResolverFindListByUrl(url),
  };
}

export function createResolverFindItemByUrl(url: string) {
  return (_: any, args: Object) => loadData(`${url + args.id}/`);
}

type CreateFCItemOpts = {
  type: GraphQLObjectType,
  url: string,
};

export function createFCItem({ type, url }: CreateFCItemOpts) {
  return {
    type,
    args: {
      id: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: createResolverFindItemByUrl(url),
  };
}

export const TypesAndUrls = {
  Person: {
    type: PersonType,
    url: 'https://swapi.co/api/people/',
  },
  Planet: {
    type: PlanetType,
    url: 'https://swapi.co/api/planets/',
  },
  Film: {
    type: FilmType,
    url: 'https://swapi.co/api/films/',
  },
  Species: {
    type: SpeciesType,
    url: 'https://swapi.co/api/species/',
  },
  Starship: {
    type: StarshipType,
    url: 'https://swapi.co/api/starships/',
  },
  Vehicle: {
    type: VehicleType,
    url: 'https://swapi.co/api/vehicles/',
  },
};
