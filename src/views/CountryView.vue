<template>
  <div>
    <RouterLink to="/">Back</RouterLink>
    <div>
      <h1>Information about country: {{route.params.id}}</h1>
      <div v-if="store.loading">Loading..</div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useCountryStore } from '../stores/countryStore';
import { useRoute } from 'vue-router';
const route = useRoute()
const store = useCountryStore()
onMounted(async()=>{
  await store.handleCountry(route.params.id)
})
</script>

<style lang="scss" scoped>

</style>