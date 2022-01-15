import gql from 'graphql-tag';

const SUBSCRIPTION_ORDER_BOOK_UPDATED = gql`
  subscription OrderBookUpdated($id: String!) {
    OrderBookUpdated(id: $id) {
      id
      name
      isArchived
    }
  }
`;
