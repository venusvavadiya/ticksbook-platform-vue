import gql from 'graphql-tag';

export const GQL_ORDER_BOOK_UPDATED = gql`
  subscription OrderBookUpdated($id: String!) {
    OrderBookUpdated(id: $id) {
      id
      name
      isArchived
    }
  }
`;
