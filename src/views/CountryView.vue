<template>
  <div>
    <RouterLink to="/currency-app/">Back</RouterLink>
    <div>
      <h1>Countries with currency: {{route.params.id}}</h1>
      <div>
        <router-link :to="{name:'CountryInfo',params:{id:country.name.common} }" v-for="country in store.data" :key="country.tId">
          {{ country.name.common }}
        </router-link>
      </div>
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
  store.loading=true
  await store.handleCountry(route.params.id)
  store.loading=false
})
</script>

<style lang="scss" scoped>

</style>