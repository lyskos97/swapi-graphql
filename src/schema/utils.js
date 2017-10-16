import { GraphQLInt, GraphQLList, GraphQLString } from 'graphql';
import fetch from 'node-fetch';
import HttpsProxyAgent from 'https-proxy-agent';

export async function loadData(url) {
  const res = await fetch(url, {
    agent: new HttpsProxyAgent(process.env.http_proxy),
  });
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

// const fn1 = createResolveFindListByUrl('https://swapi.co/api/people/');
// const fn2 = createResolveFindListByUrl('https://swapi.co/api/planets/');
// fn2({}, { limit: 1, offset: 'sdgsgsg' }).then(res => console.log(res));
// console.log(fn2.toString());
