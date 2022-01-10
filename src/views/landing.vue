<template lang="pug">
  site-layout
    v-container(fill-height)
      v-row(align="center" justify="center")
        v-col.text-center(cols="12" sm="6" md="4")
          h1 {{ $t('landing.hero.title') }}
          p.text-body-1.mt-2 {{ $t('landing.hero.content') }}
</template>

<script lang="ts">
import Vue from 'vue';
import SiteLayout from '@/layout/site-layout.vue';

export default Vue.extend({
  components: {
    SiteLayout,
  },
});
</script>
