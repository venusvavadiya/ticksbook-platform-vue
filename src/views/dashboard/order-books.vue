<template lang="pug">
  app-layout
    v-container(v-if="orderBooks.length")
      p.text-center {{ $tc('orderBooks', orderBooks.length) }}

      order-book-list(
        :loading="loadingOrderBooks"
        :order-books="orderBooks"
        route="order-book"
      )

    v-container(v-if="orderBooks.length == 0")
      p.text-center.my-12 {{ $tc('orderBooks', 0) }}

    ui-form-dialog(
      v-model="showingCreateDialog"
      :title="$t('createOrderBook')"
      :hook-done="() => platformMutationService.createOrderBook(createField.name)"
      :hook-reset="() => resetCreateField()"
    )
      create-order-book-fields(:name.sync="createField.name")

    v-btn(fab fixed bottom right @click="showingCreateDialog = true"): v-icon mdi-plus
</template>

<script>
import Vue from 'vue';
import CreateOrderBookFields from '@/components/create-order-book-fields.vue';
import OrderBookList from '@/components/order-book-list.vue';
import AppLayout from '@/layouts/app-layout.vue';

export default Vue.extend({
  components: {
    AppLayout,
    CreateOrderBookFields,
    OrderBookList,
  },

  inject: [
    'platformMutationService',
    'platformQueryService',
  ],

  data() {
    return {
      showingCreateDialog: false,

      createField: {
        name: '',
      },

      loadingOrderBooks: false,
      orderBooks: null,
    };
  },

  async mounted() {
    await this.loadOrderBooks();
  },

  methods: {
    async loadOrderBooks() {
      this.loadingOrderBooks = true;
      this.orderBooks = await this.platformQueryService.getOrderBooks();
      this.loadingOrderBooks = false;
    },

    resetCreateField() {
      this.createField.name = '';
    },
  },
});
</script>
