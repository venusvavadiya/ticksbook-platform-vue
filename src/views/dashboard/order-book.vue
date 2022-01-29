<template lang="pug">
  app-layout
    v-container(v-if="orderBook")
      order-book-detail-card(
        :is-archived="orderBook.isArchived"
        :name="orderBook.name"
        :orders="orderBook.orders"
        @click:add-order="showingCreateOrderDialog = true"
        @click:archive="platformMutationService.archiveOrderBook(orderBook.id)"
        @click:rename="showingRenameDialog = true"
        @click:unarchive="platformMutationService.unarchiveOrderBook(orderBook.id)"
      )

      ui-form-dialog(
        v-model="showingCreateOrderDialog"
        :title="$t('addOrder')"
        :hook-done="() => platformMutationService.createOrder(orderBook.id, createOrderField.tickerId, createOrderField.orderQuantity, createOrderField.unitPrice)"
        :hook-reset="() => resetCreateOrderField()"
      )
        create-order-fields(
          :ticker-id.sync="createOrderField.tickerId"
          :order-quantity.sync="createOrderField.orderQuantity"
          :unit-price.sync="createOrderField.unitPrice"
        )

      ui-form-dialog(
        v-model="showingRenameDialog"
        :title="$t('renameOrderBook')"
        :hook-done="() => platformMutationService.renameOrderBook(orderBook.id, renameField.name)"
        :hook-reset="() => resetRenameField()"
      )
        rename-order-book-fields(:name.sync="renameField.name")

    v-container(v-else)
      p.text-center.my-12 {{ $t('noData') }}
</template>

<script>
// TODO: the following are uuids for the instruments
// 7300ab8c-835c-4310-9ab8-65d10555814f: HCLTECH22FEB1200PE
import Vue from 'vue';
import CreateOrderFields from '@/components/create-order-fields.vue';
import OrderBookDetailCard from '@/components/order-book-detail-card.vue';
import RenameOrderBookFields from '@/components/rename-order-book-fields.vue';
import { GQL_ORDER_BOOK } from '@/graphql/queries';
import { GQL_ORDER_BOOK_UPDATED } from '@/graphql/subscriptions';
import AppLayout from '@/layouts/app-layout.vue';

export default Vue.extend({
  components: {
    AppLayout,
    CreateOrderFields,
    OrderBookDetailCard,
    RenameOrderBookFields,
  },

  inject: ['platformMutationService'],

  data() {
    return {
      showingCreateOrderDialog: false,
      showingRenameDialog: false,

      createOrderField: {
        tickerId: '',
        orderQuantity: 0,
        unitPrice: 0,
      },

      renameField: {
        name: '',
      },
    };
  },

  apollo: {
    orderBook: {
      query: GQL_ORDER_BOOK,
      variables() { return { id: this.$route.params.id }; },

      subscribeToMore: {
        document: GQL_ORDER_BOOK_UPDATED,
        variables() { return { id: this.$route.params.id }; },
      },
    },
  },

  created() {
    this.$apollo.queries.orderBook.refetch();
  },

  methods: {
    resetCreateOrderField() {
      this.createOrderField.tickerId = '';
      this.createOrderField.orderQuantity = 0;
      this.createOrderField.unitPrice = 0;
    },

    resetRenameField() {
      this.renameField.name = this.orderBook.name;
    },
  },
});
</script>
