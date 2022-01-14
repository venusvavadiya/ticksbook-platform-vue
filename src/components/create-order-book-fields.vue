<template lang="pug">
  v-row
    v-col
      v-text-field(
        outlined
        hide-details="auto"
        :label="$t('name')"
        @input="$emit('update:name', $event)"
      )
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    name: String,
  },
});
</script>
