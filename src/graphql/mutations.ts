import gql from 'graphql-tag';

export const GQL_ARCHIVE_ORDER_BOOK = gql`
  mutation archiveOrderBook($orderBookId: String!) {
    archiveOrderBook(orderBookId: $orderBookId)
  }
`;

export const GQL_CREATE_ORDER_BOOK = gql`
  mutation createOrderBook($orderBookName: String!) {
    createOrderBook(orderBookName: $orderBookName)
  }
`;

export const GQL_RENAME_ORDER_BOOK = gql`
  mutation renameOrderBook(
    $orderBookId: String!
    $orderBookName: String!
  ) {
    renameOrderBook(
      orderBookId: $orderBookId
      orderBookName: $orderBookName
    )
  }
`;

export const GQL_UNARCHIVE_ORDER_BOOK = gql`
  mutation unarchiveOrderBook($orderBookId: String!) {
    unarchiveOrderBook(orderBookId: $orderBookId)
  }
`;
