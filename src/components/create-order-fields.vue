<template lang="pug">
  v-row
    v-col(cols="12")
      ui-text-field(
        :label="$t('tickerId')"
        :value="tickerId"
        @input="$emit('update:tickerId', $event)"
      )

    v-col(cols="12")
      ui-text-field(
        :label="$t('orderQuantity')"
        type="number"
        :value="orderQuantity"
        @input="$emit('update:orderQuantity', parseInt($event, 10))"
      )

    v-col(cols="12")
      ui-text-field(
        :label="$t('unitPrice')"
        type="number"
        :value="unitPrice"
        @input="$emit('update:unitPrice', parseInt($event, 10))"
      )
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    tickerId: String,
    orderQuantity: Number,
    unitPrice: Number,
  },
});
</script>
