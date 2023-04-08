import { defineStore } from "pinia";
import {ref} from 'vue'

export const useCountryStore = defineStore('country-store',()=>{
  const data = ref()
  const loading = ref(false)
  const error = ref(null)

  const handleCountry = async(currency) =>{
    loading.value = true
    const resp = await fetch(`https://restcountries.com/v3.1/currency/${currency}`)
    const json = await resp.json()
    loading.value = false
    console.log(json)
  }
  
  return {data,handleCountry}
})