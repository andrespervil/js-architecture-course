// Vendor libs
const { ApolloError } = require('apollo-server-express');

// Custom libs
const products = require('../../data/products');

const resolvers = {
  Query: {
    topProducts: (parent, { first }) => {
      return products.slice(0, first);
    },
    productByUPC: (parent, { upc }) => {
      if (!upc) {
        return null;
      }

      return products.find(x => x.upc === upc);
    }
  },
  Mutation: {
    addNewProduct: (parent, { upc, name, price, weight }) => {
      let p = products.find(x => x.upc === upc);
      if (!p) {
        p = {
          upc,
          name,
          price,
          weight
        };
        products.push(p);
        return p;
      }
      throw new ApolloError('El producto ya existe');
    }
  }
};

module.exports = resolvers;
