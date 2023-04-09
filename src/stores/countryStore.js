import { defineStore } from "pinia";
import {ref} from 'vue'

export const useCountryStore = defineStore('country-store',()=>{
  const data = ref()
  const loading = ref(false)
  const error = ref(null)
  const countryInfo = ref()

  const handleCountry = async(currency) =>{
    loading.value = true
    const resp = await fetch(`https://restcountries.com/v3.1/currency/${currency}`)
    const json = await resp.json()
    data.value = json
    loading.value = false
    console.log(data.value)
  }
  const handleCountryInfo = async(name) => {
    loading.value = true
    const resp = await fetch(`https://restcountries.com/v3.1/name/${name}`)
    const json = await resp.json()
    console.log(json)
    countryInfo.value = json
    loading.value = false
  }
  return {data,handleCountry,countryInfo,handleCountryInfo}
})