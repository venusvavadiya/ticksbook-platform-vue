<template lang="pug">
  v-row
    v-col(cols="12")
      ui-text-field(
        :label="$t('name')"
        :value="name"
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
