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
import OrderBookList from '@/components/order-book-list.vue';
import AppLayout from '@/layout/app-layout.vue';

export default Vue.extend({
  components: {
    AppLayout,
    OrderBookList,
  },

  data() {
    return {
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
