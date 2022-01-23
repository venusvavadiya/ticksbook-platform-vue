<template lang="pug">
  v-card
    v-card-title
      span {{ name }}
      v-spacer

      v-btn(
        outlined
        @click="$emit('click:add-order')"
      ) {{ $t('addOrder') }}

      v-menu(bottom left)
        template(#activator="{ on, attrs }")
          v-btn(
            icon
            v-bind="attrs"
            v-on="on"
          )
            v-icon mdi-dots-vertical

        v-list
          v-list-item(@click="$emit('click:rename')")
            v-list-item-title {{ $t('rename') }}

          v-list-item(
            v-if="isArchived"
            @click="$emit('click:unarchive')"
          )
            v-list-item-title {{ $t('unarchive') }}

          v-list-item(
            v-else
            @click="$emit('click:archive')"
          )
            v-list-item-title {{ $t('archive') }}

    ui-data-table(
      :headers="orderHeaders"
      :items="orders"
    )
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  props: {
    isArchived: Boolean,
    name: String,
    orders: Array,
  },

  data() {
    return {
      orderHeaders: [
        { text: 'Id', value: 'id' },
        { text: 'Ticker', value: 'tickerId' },
        { text: 'Qty', value: 'orderQuantity', align: 'right' },
        { text: 'Price', value: 'unitPrice', align: 'right' },
      ],
    };
  },
});
</script>
