<template lang="pug">
  app-layout
    v-container(fill-height)
      v-row(align="center" justify="center")
        v-col.text-center(cols="12" sm="6" md="4")
          p {{ $t('dashboard') }}
</template>

<script lang="ts">
import Vue from 'vue';
import AppLayout from '@/layout/app-layout.vue';

export default Vue.extend({
  components: {
    AppLayout,
  },

  created() {
    this.$router.replace({ name: 'order-books' });
  },
});
</script>
