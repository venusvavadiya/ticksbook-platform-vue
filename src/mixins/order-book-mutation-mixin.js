import {
  GQL_ARCHIVE_ORDER_BOOK,
  GQL_CREATE_ORDER_BOOK,
  GQL_RENAME_ORDER_BOOK,
  GQL_UNARCHIVE_ORDER_BOOK,
} from '@/graphql/mutations';

export const orderBookMutationMixin = {
  methods: {
    archiveOrderBook(orderBookId) {
      const variables = { orderBookId };
      return this.$apollo.mutate({ mutation: GQL_ARCHIVE_ORDER_BOOK, variables });
    },

    createOrderBook(orderBookName) {
      const variables = { orderBookName };
      return this.$apollo.mutate({ mutation: GQL_CREATE_ORDER_BOOK, variables });
    },

    renameOrderBook(orderBookId, orderBookName) {
      const variables = { orderBookId, orderBookName };
      return this.$apollo.mutate({ mutation: GQL_RENAME_ORDER_BOOK, variables });
    },

    unarchiveOrderBook(orderBookId) {
      const variables = { orderBookId };
      return this.$apollo.mutate({ mutation: GQL_UNARCHIVE_ORDER_BOOK, variables });
    },
  },
};
