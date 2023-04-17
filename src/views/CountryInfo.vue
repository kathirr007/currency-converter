<template>
  <div>
    <a class="link" @click="$router.go(-1)">
      <i class="fas fa-arrow-left"></i>
    </a>
    <div class="loader" v-if="store.loading">Loading..</div>
    <div class="info" v-else-if="!store.loading">

      <div class="info-item" v-for="info in store.countryInfo" :key="info.tId">
        <h1>{{ info.name.common }}</h1>
        <img :src="info.flags.png" alt="flag img">
        <div v-for="cpt in info.capital" :key="cpt">
          <p>
            Capital: {{ cpt }}
          </p>
        </div>
        <div v-for="curr in info.currencies" :key="curr">
          <p>
            {{ curr.name }}
          </p>
        </div>
        <p>Population: {{ info.population }}</p>
        <p>Region: {{ info.region }}</p>
        <p>Subregion: {{ info.subregion }}</p>
        <div>Languages:
          <p v-for="lang in info.languages" :key="lang">{{ lang }}</p>
        </div>
        <p>Borders:</p>
        <div class="info-item-borders" v-if="info.borders">
          <router-link class="link" :to="{ name: 'CountryInfo', params: { id: border }, replace: true }"
            v-for="border in info.borders" :key="border">{{ border }}</router-link>
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

const handleInfo = async (id) => {

  store.loading = true
  await store.handleCountryInfo(id)
  store.loading = false
}

onBeforeRouteUpdate(async (to) => {
  await handleInfo(to.params.id)
})

onMounted(async () => {
  await handleInfo(route.params.id)
})
</script>

<style lang="scss" scoped>
.info{
  display: grid;
  place-content: center;
  text-align: center;
  & h1,img,p{
    margin:0 auto;
    padding: $space-h;
  }
  &-item-borders{
    padding:$space-1;
    display: grid;
    gap:$space-h;
    grid-template-columns: repeat(auto-fit,minmax(75px,1fr));
    & a{
      width:100%;
    }
  }
}
</style>