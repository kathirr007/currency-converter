<template>
  <div>
    <router-link class="link" to="/currency-app/">
      <i class="fas fa-arrow-left"></i>
    </router-link>
    <div class="countries">
      <h1>Countries with currency: {{ route.params.id }}</h1>
      <div class="country-list" v-if="!store.loading">
        <router-link class="link link-country" :to="{ name: 'CountryInfo', params: { id: country.cca3 } }" v-for="country in store.data"
          :key="country.tId">
          {{ country.name.common }}
        </router-link>
      </div>
      <div class="loader" v-if="store.loading">Loading..</div>
    </div>
  </div>
</template>

<script setup>
import { useCountryStore } from '../stores/countryStore';
import { useRoute } from 'vue-router';
const route = useRoute()
const store = useCountryStore()
const handleFetch = async () => {
  store.loading = true
  await store.handleCountry(route.params.id)
  store.loading = false
}
handleFetch()
</script>

<style lang="scss" scoped>
.countries{
  text-align: center;
  & h1{
    padding:$space-2;
  }
}
.country-list{
  display: flex;
  flex-wrap: wrap;
  gap:$space-h;
  max-width:650px;
  margin-inline:auto;
  & .link-country{
    font-size:$font-sm;
  }
}
</style>