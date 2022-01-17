<template lang="pug">
  v-app
    v-navigation-drawer(v-model="isDrawer" app clipped)
      app-nav-list

    v-app-bar(app elevation="0")
      v-row(align="center")
        v-app-bar-nav-icon(@click="isDrawer = !isDrawer")

        router-link(:to="{ name: 'index' }")
          v-img(src="../assets/logo.png" width="40")

    v-main
      v-progress-linear(v-if="$apollo.loading" indeterminate)
      slot
</template>

<script lang="ts">
import Vue from 'vue';
import AppNavList from '@/components/app-nav-list.vue';

function isDarkModePreference(): boolean {
  const query = '(prefers-color-scheme: dark)';
  return window.matchMedia(query).matches;
}

function addDarkModePreferenceEventListener(listener: (x: boolean) => void): void {
  const query = '(prefers-color-scheme: dark)';
  window.matchMedia(query).addEventListener('change', (e) => {
    listener(e.matches);
  });
}

export default Vue.extend({
  components: {
    AppNavList,
  },

  data() {
    return {
      isDrawer: false,
    };
  },

  created(): void {
    this.$vuetify.theme.dark = isDarkModePreference();
    addDarkModePreferenceEventListener((isDark) => {
      this.$vuetify.theme.dark = isDark;
    });
  },
});
</script>
