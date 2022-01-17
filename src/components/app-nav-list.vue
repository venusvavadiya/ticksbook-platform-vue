<template lang="pug">
  v-list(shaped)
    v-subheader MANAGE

    v-list-item(
      exact
      :to="{ name: 'order-books' }"
    )
      v-list-item-title Order Books
</template>
