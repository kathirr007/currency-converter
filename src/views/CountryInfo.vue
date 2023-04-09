<template>
  <div>
    <button @click="$router.go(-1)">Back</button>
    <p v-if="store.loading">Loading..</p>
    <div v-if="!store.loading">

      <div v-for="info in store.countryInfo" :key="info.tId">
        <h1>{{info.name.common}}</h1>
        <img :src="info.flags.png" alt="flag img">
      </div>
    </div>

  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useCountryStore } from '../stores/countryStore';
import { useRoute } from 'vue-router';
const store = useCountryStore()
const route = useRoute()
    onMounted(async()=>{
      store.loading = true
      await store.handleCountryInfo(route.params.id)
      store.loading = false
    })
</script>

<style lang="scss" scoped>

</style>