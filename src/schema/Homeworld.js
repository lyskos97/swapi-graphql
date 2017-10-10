import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } from 'graphql';
import { loadBulk } from './utils';
import PeopleType from './People';

const HomeworldType = new GraphQLObjectType({
  name: 'Homeworld',
  fields: () => ({
    name: { type: GraphQLString },
    climate: { type: GraphQLString },
    residents: { type: new GraphQLList(GraphQLString) },
    residentList: {
      type: new GraphQLList(PeopleType),
      args: {
        limit: { type: GraphQLInt, defaultValue: 5 },
      },
      resolve: (source, args) => {
        if (args && args.limit > 0) {
          return loadBulk(source.residents.slice(0, args.limit));
        }
        return loadBulk(source.residents);
      },
    },
  }),
});

export default HomeworldType;
