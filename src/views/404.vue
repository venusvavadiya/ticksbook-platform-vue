<template lang="pug">
  site-layout
    p 404
</template>

<script lang="ts">
import Vue from 'vue';
import SiteLayout from '@/layouts/site-layout.vue';

export default Vue.extend({
  components: {
    SiteLayout,
  },
});
</script>
