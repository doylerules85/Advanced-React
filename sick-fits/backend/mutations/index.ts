import { graphQLSchemaExtension } from '@keystone-next/keystone/schema';
import addToCart from './addToCart';

// little hack for syntax highlighting for graphql
const graphql = String.raw;

// defining custom mutation
export const extendGraphqlSchema = graphQLSchemaExtension({
  typeDefs: graphql`
    type Mutation {
      addToCart(productId: ID): CartItem
    }
  `,
  // above - creating mutation  -- below - resolver and the mutation name that will be used.
  resolvers: {
    Mutation: {
      addToCart,
    },
  },
});
