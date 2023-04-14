import { defineStore } from "pinia";
import {ref} from 'vue'

export const useCountryStore = defineStore('country-store',()=>{
  const data = ref()
  const loading = ref(false)
  const error = ref(null)
  const countryInfo = ref()

  const handleCountry = async(currency) =>{
    try{
    loading.value = true
    const resp = await fetch(`https://restcountries.com/v3.1/currency/${currency}`)
    const json = await resp.json()
    data.value = json
    loading.value = false
    }
    catch(err){
      error.value = err
    }
  }
  const handleCountryInfo = async(code) => {
    try{
      loading.value = true
      const resp = await fetch(`https://restcountries.com/v3.1/alpha/${code}
      `)
    const json = await resp.json()
    countryInfo.value = json
    loading.value = false
    }
    catch(err){
      error.value = err
    }
  }
  return {data,handleCountry,countryInfo,handleCountryInfo}
})