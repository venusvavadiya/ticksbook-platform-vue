<template lang="pug">
  site-layout
    v-container(fill-height)
      v-row(align="center" justify="center")
        v-col.text-center(cols="12" sm="6" md="4")
          h1 {{ $t('heroTitle') }}
          p.text-body-1.mt-2 {{ $t('heroContent') }}

          v-btn(
            v-if="$auth0.isAuthenticated"
            :to="{ name: 'dashboard' }"
          ) {{ $t('dashboard') }}

          v-btn(
            v-else
            @click="$auth0.login()"
          ) {{ $t('login') }}
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
