<template lang="pug">
  ui-dialog(
    :value="value"
    @input="$emit('input', $event)"
  )
    v-card(:loading="loading")
      v-card-title {{ title }}

      v-card-text
        v-form(@submit.prevent="doneClickHandler")
          slot

      v-card-actions
        v-spacer
        v-btn(text :disabled="loading" @click="cancelClickHandler") {{ $t('cancel') }}
        v-btn(text :disabled="loading" @click="doneClickHandler") {{ $t('done') }}
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    title: String,
    value: Boolean,
    hookDone: Function,
    hookReset: Function,
  },

  data() {
    return {
      loading: false,
    };
  },

  watch: {
    value() {
      this.hookReset();
    },
  },

  methods: {
    cancelClickHandler() {
      this.loading = false;
      this.$emit('input', false);
      this.$emit('cancel');
    },

    doneClickHandler() {
      this.loading = true;
      this.hookDone().finally(() => {
        this.loading = false;
        this.$emit('input', false);
        this.$emit('done');
      });
    },
  },
});
</script>
