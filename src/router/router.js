import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CountryView from '../views/CountryView.vue'
import CountryInfo from '../views/CountryInfo.vue'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'HomeView',
      path: '/',
      component: HomeView
    },
    {
      name: 'CountryView',
      path: '/CountryView/:id',
      component: CountryView,
      props: true
    },
    {
      name: 'CountryInfo',
      path: '/CountryInfo/:id',
      component: CountryInfo,
      props: true
    }
  ]
})

export default router
