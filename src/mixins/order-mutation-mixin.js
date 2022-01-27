import {
  GQL_CREATE_ORDER,
} from '@/graphql/mutations';

export const orderMutationMixin = {
  methods: {
    createOrder(orderBookId, tickerId, orderQuantity, unitPrice) {
      const variables = {
        orderBookId, tickerId, orderQuantity, unitPrice,
      };

      return this.$apollo.mutate({ mutation: GQL_CREATE_ORDER, variables });
    },
  },
};
