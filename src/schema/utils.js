/* @flow */
import { GraphQLInt, GraphQLList, GraphQLString, GraphQLNonNull } from 'graphql';
import type { GraphQLObjectType } from 'graphql';
import HttpsProxyAgent from 'https-proxy-agent';
import fetch from 'node-fetch';
import PersonType from './Person';
import PlanetType from './Planet';
import FilmType from './Film';
import SpeciesType from './Species';
import StarshipType from './Starship';
import VehicleType from './Vehicle';

export async function loadData(url: string) {
  const res = await fetch(url, {
    agent: new HttpsProxyAgent(process.env.http_proxy || 'http://10.8.128.1:3128'),
  });
  const data = await res.json();
  if (data && data.count && data.results) {
    return data.results;
  }
  return data;
}

export async function loadBulk(urls: Array<string>) {
  return Promise.all(urls.map(u => loadData(u)));
}

export function createResolveFindListByUrl(url: string) {
  return async (_: Object, args: Object) => {
    let data = await loadData(url);
    if (args) {
      if (args.orderBy) {
        data.sort();
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

export function createResolve(url: string) {
  return async (_: Object, args: Object) => loadData(`${url + args.id}/`);
}

type FCArgs = { type: GraphQLObjectType, url: string };

export function createFC({ type, url }: FCArgs) {
  return {
    type,
    args: { id: { type: new GraphQLNonNull(GraphQLInt) } },
    resolve: createResolve(url),
  };
}

export function createFCList({ type, url }: FCArgs) {
  return {
    type: new GraphQLList(type),
    args: {
      limit: { type: GraphQLInt, defaultValue: 3 },
      offset: { type: GraphQLInt, defaultValue: 0 },
      orderBy: { type: GraphQLString },
    },
    resolve: createResolveFindListByUrl(url),
  };
}

export function generateTypeFromJSON(name: string, obj: Object) {
  const keys = Object.keys(obj);
  const grapqltype = {};
  keys.forEach(key => {
    switch (typeof obj[key]) {
      case 'string':
        Object.assign(grapqltype, { [key]: { type: GraphQLString } });
        break;
      case 'object':
        Object.assign(grapqltype, {
          [`${key}Urls`]: {
            type: new GraphQLList(GraphQLString),
            resolve: source => source[key],
          },
        });
        Object.assign(grapqltype, {
          [key]: {
            type: new GraphQLList(GraphQLString),
            resolve: source => loadBulk(source[key]),
          },
        });
        if (!Array.isArray(obj[key])) {
          Object.assign(grapqltype, {
            [key]: {
              type: GraphQLString,
              resolve: source => loadData(source[key]),
            },
          });
        }
        break;
      case 'number':
        Object.assign(grapqltype, { [key]: { type: GraphQLInt } });
        break;
      default:
        Object.assign((grapqltype, { [key]: null }));
    }
  });
  return {
    name,
    fields: grapqltype,
  };
}
/* В порядке бреда */
export function toAPIType(key: string): GraphQLObjectType | null {
  if (key === 'planets') {
    return PlanetType;
  } else if (key === 'people' || key === 'pilots' || key === 'residents') {
    return PersonType;
  } else if (key === 'species') {
    return SpeciesType;
  } else if (key === 'vehicles') {
    return VehicleType;
  } else if (key === 'starships') {
    return StarshipType;
  } else if (key === 'films') {
    return FilmType;
  }
  return null;
}

// Sorting with enum

/* 
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
 */

// if/else version of Type generator

/* 
if (typeof obj[key] === 'string') {
      Object.assign(grapqltype, { [key]: { type: GraphQLString } });
    } else if (typeof obj[key] === 'object') {
      Object.assign(grapqltype, {
        [key]: { type: new GraphQLList(GraphQLString) },
      });
    } else if (typeof obj[key] === 'number') {
      Object.assign(grapqltype, { [key]: { type: GraphQLInt } });
    } else Object.assign(grapqltype, { [key]: null });
*/
