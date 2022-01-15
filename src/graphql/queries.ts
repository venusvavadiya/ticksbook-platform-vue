import gql from 'graphql-tag';

export const ORDER_BOOKS = gql`
  query orderBooks {
    orderBooks {
      id
      name
    }
  }
`;

export const ORDER_BOOK = gql`
  query orderBook($id: String!) {
    orderBook(id: $id) {
      id
      name
      isArchived
    }
  }
`;
