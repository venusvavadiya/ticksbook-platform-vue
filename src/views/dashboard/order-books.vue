<template lang="pug">
  app-layout
    v-container(v-if="orderBooks.length")
      p.text-center {{ $tc('orderBooks', orderBooks.length) }}

      order-book-list(
        :order-books="orderBooks"
        route="order-book"
      )

    .text-center.my-12(v-else)
      p {{ $tc('orderBooks', 0) }}

    v-container
      v-card
        v-card-text
          create-order-book-fields(:name.sync="createOrderBookDialog.name")

        v-card-text Name: {{ createOrderBookDialog.name }}

    v-btn(
      fab
      fixed
      bottom
      right
    )
      v-icon mdi-plus
</template>

<script lang="ts">
import Vue from 'vue';
import CreateOrderBookFields from '@/components/create-order-book-fields.vue';
import OrderBookList from '@/components/order-book-list.vue';
import AppLayout from '@/layout/app-layout.vue';

export default Vue.extend({
  components: {
    AppLayout,
    CreateOrderBookFields,
    OrderBookList,
  },

  data() {
    return {
      createOrderBookDialog: {
        name: '',
      },

      orderBooks: [
        {
          id: 'o1d1',
          name: 'Zerodha',
          isArchived: false,
        },

        {
          id: 'o1d2',
          name: 'tastyworks',
          isArchived: false,
        },
      ],
    };
  },
});
</script>
