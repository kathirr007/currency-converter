<template>
  <div>
    <router-link to="/currency-app/">Back</router-link>
    <div>
      <h1>Countries with currency: {{route.params.id}}</h1>
      <div v-if="!store.loading">
        <router-link :to="{name:'CountryInfo',params:{id:country.cca3} }" v-for="country in store.data" :key="country.tId">
          {{ country.name.common }}
        </router-link>
      </div>
      <div v-if="store.loading">Loading..</div>
    </div>
  </div>
</template>

<script setup>
import { useCountryStore } from '../stores/countryStore';
import { useRoute } from 'vue-router';
const route = useRoute()
const store = useCountryStore()
const handleFetch = async()=>{
  store.loading=true
  await store.handleCountry(route.params.id)
  store.loading=false
}
handleFetch()
</script>

<style lang="scss" scoped>

</style>