<template lang="pug">
  app-layout
    v-container(v-if="orderBook")
      order-book-detail-card(
        :is-archived="orderBook.isArchived"
        :name="orderBook.name"
        :orders="orderBook.orders"
        @click:archive="archiveOrderBook(orderBook.id)"
        @click:rename="showingRenameDialog = true"
        @click:unarchive="unarchiveOrderBook(orderBook.id)"
      )

      ui-form-dialog(
        v-model="showingRenameDialog"
        :title="$t('renameOrderBook')"
        :hook-done="() => renameOrderBook(orderBook.id, renameField.name)"
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
import OrderBookDetailCard from '@/components/order-book-detail-card.vue';
import RenameOrderBookFields from '@/components/rename-order-book-fields.vue';
import { GQL_ORDER_BOOK } from '@/graphql/queries';
import AppLayout from '@/layouts/app-layout.vue';
import { orderBookMutationMixin } from '@/mixins/order-book-mutation-mixin';

export default Vue.extend({
  mixins: [
    orderBookMutationMixin,
  ],

  components: {
    AppLayout,
    OrderBookDetailCard,
    RenameOrderBookFields,
  },

  data() {
    return {
      showingRenameDialog: false,

      renameField: {
        name: '',
      },
    };
  },

  apollo: {
    orderBook: {
      query: GQL_ORDER_BOOK,

      variables() {
        return { id: this.$route.params.id };
      },
    },
  },

  created() {
    this.$apollo.queries.orderBook.refetch();
  },

  methods: {
    resetRenameField() {
      this.renameField.name = this.orderBook.name;
    },
  },
});
</script>
