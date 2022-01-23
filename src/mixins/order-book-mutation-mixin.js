import {
  GQL_ARCHIVE_ORDER_BOOK,
  GQL_RENAME_ORDER_BOOK,
  GQL_UNARCHIVE_ORDER_BOOK,
} from '@/graphql/mutations';

export const orderBookMutationMixin = {
  methods: {
    async archiveOrderBook(orderBookId) {
      const variables = { orderBookId };
      await this.$apollo.mutate({ mutation: GQL_ARCHIVE_ORDER_BOOK, variables });
    },

    async renameOrderBook(orderBookId, orderBookName) {
      const variables = { orderBookId, orderBookName };
      await this.$apollo.mutate({ mutation: GQL_RENAME_ORDER_BOOK, variables });
    },

    async unarchiveOrderBook(orderBookId) {
      const variables = { orderBookId };
      await this.$apollo.mutate({ mutation: GQL_UNARCHIVE_ORDER_BOOK, variables });
    },
  },
};
