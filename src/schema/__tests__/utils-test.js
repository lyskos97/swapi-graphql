/* @flow */

// import { GraphQLInt, GraphQLList, GraphQLString } from 'graphql';
import { loadData, loadBulk, createResolve } from '../utils';

describe('utils', () => {
  describe('loadData()', () => {
    it('loads singular record Luke', async () => {
      const data = await loadData('https://swapi.co/api/people/1/');
      const loadDataMock = jest.fn().mockImplementation(kek => `${kek}is KEK!`);
      console.log('loadDataMock', loadDataMock('me '));
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
    it('loads list of records', async () => {
      const data = await loadData('https://swapi.co/api/people/');
      expect(Array.isArray(data)).toBeTruthy();
      expect(data).toMatchSnapshot();
    });
  });
  describe('loadBulk()', () => {
    it('returns an array of objects', async () => {
      const dataArray = await loadBulk([
        'https://swapi.co/api/people/4/',
        'https://swapi.co/api/people/1/',
      ]);
      expect(dataArray).toEqual([
        {
          name: 'Darth Vader',
          height: '202',
          mass: '136',
          hair_color: 'none',
          skin_color: 'white',
          eye_color: 'yellow',
          birth_year: '41.9BBY',
          gender: 'male',
          homeworld: 'https://swapi.co/api/planets/1/',
          films: [
            'https://swapi.co/api/films/2/',
            'https://swapi.co/api/films/6/',
            'https://swapi.co/api/films/3/',
            'https://swapi.co/api/films/1/',
          ],
          species: ['https://swapi.co/api/species/1/'],
          vehicles: [],
          starships: ['https://swapi.co/api/starships/13/'],
          created: '2014-12-10T15:18:20.704000Z',
          edited: '2014-12-20T21:17:50.313000Z',
          url: 'https://swapi.co/api/people/4/',
        },
        {
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
        },
      ]);
    });
  });
  describe('createResolve()', () => {
    it('returns an async function', () => {
      // loadData = jest.fn();
      // createResolve = jest.fn();
      createResolve('https://swapi.co/api/planets/4/');
      const mock = jest.fn();
      // console.log(mock.mock);
      // expect.assertions(1);
      // const resolve = createResolve('https://swapi.co/api/planets/4/');
      // const kek = jest.fn(createResolve);
      // kek('https://swapi.co/api/planets/4/');
      // expect(typeof kek).toBe('function');
    });
  });
});
