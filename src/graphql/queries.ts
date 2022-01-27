import gql from 'graphql-tag';

export const GQL_ORDER_BOOKS = gql`
  query orderBooks {
    orderBooks {
      id
      name
    }
  }
`;

export const GQL_ORDER_BOOK = gql`
  query orderBook($id: String!) {
    orderBook(id: $id) {
      id
      name
      isArchived
      orders {
        id
        tickerId
        orderQuantity
        unitPrice
      }
    }
  }
`;
