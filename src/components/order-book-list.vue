<template lang="pug">
  v-card(:loading="loading")
    v-list
      v-list-item(
        v-for="orderBook in orderBooks"
        :key="orderBook.id"
        :to="{ name: route, params: { id: orderBook.id } }"
      )
        v-list-item-content {{ orderBook.name }}
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    loading: Boolean,
    orderBooks: Array,
    route: String,
  },
});
</script>
