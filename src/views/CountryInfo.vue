<template>
  <div>
    <button @click="$router.go(-1)">Back</button>
    <p v-if="store.loading">Loading..</p>
    <div v-else-if="!store.loading">
      
      <div v-for="info in store.countryInfo" :key="info.tId">
        <h1>{{ info.name.common }}</h1>
        <img :src="info.flags.png" alt="flag img">
        <div v-for="cpt in info.capital" :key="cpt">
          <p>
          Capital: {{ cpt }}
          </p>
        </div>
        <div v-for="curr in info.currencies" :key="curr">
          {{ curr.name }}
        </div>
        <p>Population: {{info.population}}</p>
        <p>Region: {{ info.region }}</p>
        <p>Subregion: {{ info.subregion }}</p>
        <div >Languages:
          <p v-for="lang in info.languages" :key="lang">{{lang}}</p>
        </div>
        <div v-if="info.borders">Borders:
          <router-link :to="{name:'CountryInfo',params:{id:border},replace:true }" v-for="border in info.borders" :key="border">{{ border }}</router-link>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useCountryStore } from '../stores/countryStore';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
const store = useCountryStore()
const route = useRoute()

const handleInfo = async(id) => {

  store.loading = true
  await store.handleCountryInfo(id)
  store.loading = false
}

onBeforeRouteUpdate(async(to)=>{
  await handleInfo(to.params.id)
})

onMounted(async () => {
  await handleInfo(route.params.id)
})
</script>

<style lang="scss" scoped></style>