/* @flow */

import { GraphQLSchema } from 'graphql';
import QueryType from './Query';

// const FilmsType = new GraphQLObjectType({
//   name: 'Films',
//   fields: () => ({
//     episode_id: { type: GraphQLInt },
//     title: { type: GraphQLString },
//   }),
// });
//
// const SpeciesType = new GraphQLObjectType({
//   name: 'Species',
//   fields: () => ({
//     name: { type: GraphQLString },
//     classification: { type: GraphQLString },
//   }),
// });
//
// const VehiclesType = new GraphQLObjectType({
//   name: 'Vehicles',
//   fields: () => ({
//     name: { type: GraphQLString },
//     model: { type: GraphQLString },
//   }),
// });
//
// const StarshipsType = new GraphQLObjectType({
//   name: 'Starships',
//   fields: () => ({
//     name: { type: GraphQLString },
//     model: { type: GraphQLString },
//   }),
// });

module.exports = new GraphQLSchema({
  query: QueryType,
  // mutation
});
