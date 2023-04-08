<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <header>
      <h1>Currency exchanger</h1>
  </header>
  <RouterView v-slot="{Component}">
    <KeepAlive include="HomeView">
      <component :is="Component" />
    </KeepAlive>
  </RouterView>

</template>

<style scoped>

</style>
