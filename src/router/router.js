import { createRouter, createWebHistory } from "vue-router";
import HomeView from '../views/HomeView.vue'
import CountryView from '../views/CountryView.vue'
const router = createRouter(
  {
    history: createWebHistory(),
    routes:
      [
        {
          name: 'HomeView',
          path: '/',
          component: HomeView
        },
        {
          name:'CountryView',
          path:'/CountryView/:id',
          component:CountryView,
          prosp:true
        }
      ]
  })

export default router
