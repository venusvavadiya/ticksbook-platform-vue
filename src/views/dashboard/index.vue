<template lang="pug">
  app-layout
    p App Index
</template>

<script lang="ts">
import Vue from 'vue';
import AppLayout from '@/layout/app-layout.vue';

export default Vue.extend({
  components: {
    AppLayout,
  },
});
</script>
