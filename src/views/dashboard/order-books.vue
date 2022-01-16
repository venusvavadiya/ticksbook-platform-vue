<template lang="pug">
  app-layout
    v-container(v-if="orderBooks.length")
      p.text-center {{ $tc('orderBooks', orderBooks.length) }}

      order-book-list(
        :loading="$apollo.queries.orderBooks.loading"
        :order-books="orderBooks"
        route="order-book"
      )

    v-container(v-if="orderBooks.length == 0")
      p.text-center.my-12 {{ $tc('orderBooks', 0) }}

    v-dialog(v-model="createDialog.show" persistent)
      v-card(:loading="createDialog.loading")
        v-card-title {{ $t('createOrderBook') }}

        v-card-text
          v-form(@submit.prevent="doneCreateDialog")
            create-order-book-fields(:name.sync="createField.name")

        v-card-actions
          v-spacer
          v-btn(text :disabled="createDialog.loading" @click="cancelCreateDialog") Cancel
          v-btn(text :disabled="createDialog.loading" @click="doneCreateDialog") Done

    v-btn(
      fab
      fixed
      bottom
      right
      @click="showCreateDialog"
    )
      v-icon mdi-plus
</template>

<script lang="ts">
import Vue from 'vue';
import CreateOrderBookFields from '@/components/create-order-book-fields.vue';
import OrderBookList from '@/components/order-book-list.vue';
import AppLayout from '@/layout/app-layout.vue';
import { GQL_ORDER_BOOKS } from '@/graphql/queries';
import { GQL_CREATE_ORDER_BOOK } from '@/graphql/mutations';

export default Vue.extend({
  components: {
    AppLayout,
    CreateOrderBookFields,
    OrderBookList,
  },

  data() {
    return {
      createDialog: {
        loading: false,
        show: false,
      },

      createField: {
        name: '',
      },

      orderBooks: [],
    };
  },

  apollo: {
    orderBooks: {
      query: GQL_ORDER_BOOKS,
      pollInterval: 5000,
    },
  },

  mounted() {
    this.$apollo.queries.orderBooks.refetch();
  },

  methods: {
    cancelCreateDialog() {
      this.resetCreateDialog();
      this.resetCreateFields();
    },

    async doneCreateDialog() {
      this.createDialog.loading = true;
      const variables = { orderBookName: this.createField.name };
      try {
        const response = await this.$apollo.mutate({ mutation: GQL_CREATE_ORDER_BOOK, variables });
        const orderBookId = response.data.createOrderBook;
        await this.$router.push({ name: 'order-book', params: { id: orderBookId } });
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
      } finally {
        this.resetCreateDialog();
        this.resetCreateFields();
      }
    },

    showCreateDialog() {
      this.createDialog.show = true;
    },

    resetCreateDialog() {
      this.createDialog.loading = false;
      this.createDialog.show = false;
    },

    resetCreateFields() {
      this.createField.name = '';
    },
  },
});
</script>
