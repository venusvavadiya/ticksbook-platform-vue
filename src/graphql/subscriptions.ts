import gql from 'graphql-tag';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GQL_ORDER_BOOK_UPDATED = gql`
  subscription OrderBookUpdated($id: String!) {
    OrderBookUpdated(id: $id) {
      id
      name
      isArchived
    }
  }
`;
