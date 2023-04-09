import { createRouter, createWebHistory } from "vue-router";
import HomeView from '../views/HomeView.vue'
import CountryView from '../views/CountryView.vue'
import CountryInfo from '../views/CountryInfo.vue'
const router = createRouter(
  {
    history: createWebHistory(),
    routes:
      [
        {
          name: 'HomeView',
          path: '/currency-app/',
          component: HomeView
        },
        {
          name:'CountryView',
          path:'/currency-app/CountryView/:id',
          component:CountryView,
          props:true
        },
        {
          name:'CountryInfo',
          path:'/currency-app/CountryInfo/:id',
          component:CountryInfo
        }
      ]
  })

export default router
