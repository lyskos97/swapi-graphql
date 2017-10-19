/* @flow */
import { GraphQLSchema } from 'graphql';
import QueryType from './Query';

module.exports = new GraphQLSchema({
  query: QueryType,
});
