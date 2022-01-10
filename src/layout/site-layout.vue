<template lang="pug">
  v-app
    v-app-bar(app elevation="0")
      v-row(justify="center")
        router-link(:to="{ name: 'index' }")
          v-img(src="../assets/logo.svg" width="48")

    v-main
      slot
</template>
