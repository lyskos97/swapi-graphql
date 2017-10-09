/* @flow */

import axios from 'axios';
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} from 'graphql';
import fetch from 'node-fetch';

/* Test json-server Customer type */
const CustomerType = new GraphQLObjectType({
  name: 'Customers',
  fields: () => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    email: {type: GraphQLString},
    age: {type: GraphQLInt},
  })
});

const PeopleType = new GraphQLObjectType({
   name: 'People',
   fields: () => ({
     name: {type: GraphQLString},
     height: {type: GraphQLString},
     mass: {type: GraphQLString},
     hair_color: {type: GraphQLString},
     skin_color: {type: GraphQLString},
     eye_color: {type: GraphQLString},
     birth_year: {type: GraphQLString},
     gender: {type: GraphQLString},
     homeworld: {type: PlanetsType},
     films: {type: FilmsType},
     species: {type: SpeciesType},
     vehicles: {type: VehiclesType},
     starships: {type: StarshipsType},
   })
});

const PlanetsType = new GraphQLObjectType({
  name: 'Planets',
  fields: () => ({
    name: {type: GraphQLString},
  })
});

const FilmsType = new GraphQLObjectType({
  name: 'Films',
  fields: () => ({
    episode_id: {type: GraphQLInt},
    title: {type: GraphQLString},
  })
});

const SpeciesType = new GraphQLObjectType({
  name: 'Species',
  fields: () => ({
    name: {type: GraphQLString},
    classification: {type: GraphQLString},
  })
});

const VehiclesType = new GraphQLObjectType({
  name: 'Vehicles',
  fields: () => ({  
    name: {type: GraphQLString},
    model: {type: GraphQLString},
  })
});

const StarshipsType = new GraphQLObjectType({
  name: 'Starships',
  fields: () => ({
    name: {type: GraphQLString},
    model: {type: GraphQLString},
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    customer: {
      type: CustomerType,
      args: {
        id: {type: GraphQLString}
      },
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/customers/${args.id}`)
          .then(res => res.data);
      }
    },
    customers: {
      type: new GraphQLList(CustomerType),
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/customers`)
          .then(res => res.data);
      }
    },
    people: {
      type: PeopleType,
      args: {
        id: {type: GraphQLString}
      },
      resolve(parentvalue, args) {
        return axios.get(`https://swapi.co/api/people/${args.id}/`)
          .then(res => res.data);
      }
    }
  }
});
/* 
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
      addCustomer: {
        type: CustomerType,
        args: {
          name: {type: new GraphQLNonNull(GraphQLString)},
          email: {type: new GraphQLNonNull(GraphQLString)},
          age: {type: new GraphQLNonNull(GraphQLInt)},
        },
        resolve(parentValue, args) {
          return axios.post(`http://localhost:3000/customers`, {
            name: args.name,
            email: args.email,
            age: args.age,
          })
          .then(res => res.data);
        }
      },
      deleteCustomer: {
        type: CustomerType,
        args: {
          id: {type: new GraphQLNonNull(GraphQLString)},
        },
        resolve(parentValue, args) {
          return axios.delete(`http://localhost:3000/customers/${args.id}`)
          .then(res => res.data);
        }
      },
      updateCustomer: {
        type: CustomerType,
        args: {
          id: {type: new GraphQLNonNull(GraphQLString)},          
          name: {type: GraphQLString},
          email: {type: GraphQLString},
          age: {type: GraphQLInt},
        },
        resolve(parentValue, args) {
          return axios.patch(`http://localhost:3000/customers/${args.id}`, args)
            .then(res => res.data);
        }
      }
  }
});
 */

module.exports = new GraphQLSchema({
  query: RootQuery,
  //mutation
});