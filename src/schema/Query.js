import { GraphQLObjectType, GraphQLInt, GraphQLNonNull, GraphQLList } from 'graphql';
import { loadData } from './utils';
import PeopleType from './People';
import HomeworldType from './Homeworld';

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    people: {
      type: PeopleType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: (_, args) => loadData(`https://swapi.co/api/people/${args.id}/`),
    },
    homeworlds: {
      type: new GraphQLList(HomeworldType),
      args: {
        limit: { type: GraphQLInt, defaultValue: 5 },
      },
      resolve: async (source, args) => {
        const data = await loadData(`https://swapi.co/api/planets/`);
        if (args && args.limit > 0) {
          return data.slice(0, args.limit);
        }
        return data;
      },
    },
  }),
});

export default QueryType;
