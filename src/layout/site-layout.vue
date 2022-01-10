<template lang="pug">
  v-app
    v-app-bar(app elevation="0")
      v-row(justify="center")
        v-col(cols="auto")
          router-link(:to="{ name: 'index' }")
            v-img(src="../assets/logo.png" width="40")

    v-main
      slot
</template>

<script lang="ts">
import Vue from 'vue';

function getDarkModePreference() {
  const query = '(prefers-color-scheme: dark)';
  return window.matchMedia(query).matches;
}

export default Vue.extend({
  created(): void {
    this.$vuetify.theme.dark = getDarkModePreference();
  },
});
</script>
