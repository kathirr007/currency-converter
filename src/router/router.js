import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CountryView from '../views/CountryView.vue'
import CountryInfo from '../views/CountryInfo.vue'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'HomeView',
      path: '/currency-converter/',
      component: HomeView
    },
    {
      name: 'CountryView',
      path: '/currency-converter/CountryView/:id',
      component: CountryView,
      props: true
    },
    {
      name: 'CountryInfo',
      path: '/currency-converter/CountryInfo/:id',
      component: CountryInfo,
      props: true
    }
  ]
})

export default router
