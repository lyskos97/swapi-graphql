/* @flow */
import { GraphQLInt, GraphQLList, GraphQLString } from 'graphql';
import type { GraphQLObjectType } from 'graphql';
import fetch from 'node-fetch';
// import HttpsProxyAgent from 'https-proxy-agent';

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

export async function loadBulk(urls: [string]) {
  return Promise.all(urls.map(u => loadData(u)));
}

export function createResolveFindListByUrl(url: string) {
  return async (source: Object, args: Object) => {
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

type CreateFCListArgs = { type: GraphQLObjectType, url: string };

export function createFCList({ type, url }: CreateFCListArgs) {
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
          [key]: { type: new GraphQLList(GraphQLString) },
        });
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
