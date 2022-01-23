<template lang="pug">
  v-card-actions
    slot
    v-spacer

    v-btn(
      text
      :disabled="disabled"
      @click="$emit('click:cancel')"
    ) {{ $t('cancel') }}

    v-btn(
      text
      :disabled="disabled"
      @click="$emit('click:done')"
    ) {{ $t('done') }}
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    disabled: Boolean,
  },
});
</script>
