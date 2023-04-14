import { defineStore } from "pinia";
import { ref } from 'vue';
export const useExchangeStore = defineStore('exchange-store', () => {
  // state
  const loading = ref(false)
  const apiKey = import.meta.env.VITE_APIKEY
  const currencies = ref([])
  const error = ref()
  const data = ref()

  const rates = ref()

  //actions
  
  const handleCurrencyRates = async (currency) => {
    try{
    loading.value = true
    const resp = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${currency}
    `)
    const json = await resp.json()
    rates.value = json.conversion_rates
    loading.value = false
    }
    catch(err){
      error.value = err
    }
  }
  
  const handleCurrencies = async () => {
    try{
    const resp = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/codes/`)
    const json = await resp.json()
    currencies.value = json.supported_codes
    }
    catch(err){
      error.value = err
    }
  }

  return { data, loading, currencies, error, handleCurrencies, handleCurrencyRates, rates}

})