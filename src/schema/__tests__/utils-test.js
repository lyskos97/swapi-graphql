/* @flow */

import { GraphQLInt, GraphQLString, GraphQLList } from 'graphql';
import { loadData, createFCList, TypesAndUrls, SortEnumType } from '../utils';
import PersonType from '../Person';

describe('utils', () => {
  describe('loadData()', () => {
    it('load singular record', async () => {
      const data = await loadData('https://swapi.co/api/people/1/');
      expect(data).toEqual({
        name: 'Luke Skywalker',
        height: '172',
        mass: '77',
        hair_color: 'blond',
        skin_color: 'fair',
        eye_color: 'blue',
        birth_year: '19BBY',
        gender: 'male',
        homeworld: 'https://swapi.co/api/planets/1/',
        films: [
          'https://swapi.co/api/films/2/',
          'https://swapi.co/api/films/6/',
          'https://swapi.co/api/films/3/',
          'https://swapi.co/api/films/1/',
          'https://swapi.co/api/films/7/',
        ],
        species: ['https://swapi.co/api/species/1/'],
        vehicles: ['https://swapi.co/api/vehicles/14/', 'https://swapi.co/api/vehicles/30/'],
        starships: ['https://swapi.co/api/starships/12/', 'https://swapi.co/api/starships/22/'],
        created: '2014-12-09T13:50:51.644000Z',
        edited: '2014-12-20T21:17:56.891000Z',
        url: 'https://swapi.co/api/people/1/',
      });
    });

    it('load list of records', async () => {
      const data = await loadData('https://swapi.co/api/people/');
      expect(Array.isArray(data)).toBeTruthy();
      expect(data).toMatchSnapshot();
    });
  });

  it('createFCList()', () => {
    const data = createFCList(TypesAndUrls.Person);
    expect(data.type).toEqual(new GraphQLList(PersonType));
    expect(data.args).toEqual({
      limit: { type: GraphQLInt, defaultValue: 3 },
      offset: { type: GraphQLInt, defaultValue: 0 },
      orderBy: { type: SortEnumType },
    });
    expect(typeof data.resolve).toBe('function');
  });

  describe('createResolverFindListByUrl()', () => {
    const resolve = createResolverFindListByUrl('https://swapi.co/api/people/');
  });
});
