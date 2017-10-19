import { GraphQLInt, GraphQLList, GraphQLString } from 'graphql';
import fetch from 'node-fetch';
// import HttpsProxyAgent from 'https-proxy-agent';

export async function loadData(url) {
  const res = await fetch(
    url /* , {
    agent: new HttpsProxyAgent(process.env.http_proxy || 'http://10.8.128.1:3128'),
  } */
  );
  const data = await res.json();
  if (data && data.count && data.results) {
    return data.results;
  }
  return data;
}

export async function loadBulk(urls) {
  return Promise.all(urls.map(u => loadData(u)));
}

export function createResolveFindListByUrl(url) {
  // TODO sort
  return async (source, args) => {
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

export function createFCList({ type, url }) {
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

export async function getKeys(url: string) {
  const keys = Object.keys(await loadData(url));
  return keys;
}

export async function getValues(url: string) {
  const values = Object.values(await loadData(url));
  return values;
}

export async function generateTypeFields(url: string) {
  const types = await getKeys(url);
  const values = await getValues(url);
  const fields = {};
  for (let i = 0; i < types.length; i++) {
    if (typeof values[i] === 'string') {
      fields[types[i]] = { type: GraphQLString };
    }
    if (typeof values[i] === 'object') {
      fields[types[i]] = { type: new GraphQLList(GraphQLString) };
    }
    if (typeof values[i] === 'number') {
      fields[types[i]] = { type: GraphQLInt };
    }
  }
  types.forEach(val => {
    if (val === 'string') {
      fields[val] = { type: GraphQLString };
    }
    if (val === 'object') {
      Object.assign(fields, {
        [val]: { type: new GraphQLList(GraphQLString) },
      });
    }
  });
  return fields;
}
