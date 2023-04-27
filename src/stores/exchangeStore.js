import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useExchangeStore = defineStore('exchange-store', () => {
  // state
  const loading = ref(false)
  const apiKey = import.meta.env.VITE_EXCHANGERATE_APIKEY
  const currencies = ref([])
  const error = ref()
  const data = ref()

  const rates = ref()
  const rates2 = ref()
  const rates3 = ref()

  //actions

  const currencyKeys = [
    'USD',
    'EUR',
    'CNY',
    'AUD',
    'KRW',
    'JPY',
    'GBP',
    'INR',
    'IDR',
    'CAD',
    'RUB',
    'BRL',
    'TRY',
    'PLN',
    'PHP',
    'ZAR',
    'THB',
    'CHF',
    'MYR',
    'MXN',
    'HRK',
    'ARS',
    'KZT',
    'IRR',
    'VND',
    'ILS',
    'BDT',
    'HKD',
    'TWD',
    'COP',
    'DKK',
    'BGN',
    'NOK',
    'DZD',
    'RON',
    'SGD',
    'NGN',
    'CZK',
    'PKR',
    'SEK',
    'NZD',
    'UAH',
    'AED',
    'SAR',
    'KWD'
  ]
  const handleCurrencyRates = async (currency, currency2, currency3 = 'INR') => {
    try {
      /* const filteredObj = Object.fromEntries(
        Object.entries(currencyObj).filter(([key]) => currencyKeys.includes(key))
      ); */
      loading.value = true
      const resp = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${currency}
    `)
      const resp2 = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${currency2}
    `)
      const resp3 = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${currency3}
    `)
      const json = await resp.json()
      const json2 = await resp2.json()
      const json3 = await resp3.json()
      // rates.value = json.conversion_rates
      rates.value = Object.fromEntries(
        Object.entries(json.conversion_rates).filter(([key]) => currencyKeys.includes(key))
      )
      // rates2.value = json2.conversion_rates
      rates2.value = Object.fromEntries(
        Object.entries(json2.conversion_rates).filter(([key]) => currencyKeys.includes(key))
      )
      // rates3.value = json3.conversion_rates
      rates3.value = Object.fromEntries(
        Object.entries(json3.conversion_rates).filter(([key]) => currencyKeys.includes(key))
      )
      loading.value = false
    } catch (err) {
      error.value = err
    }
  }

  const handleCurrencies = async () => {
    try {
      const resp = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/codes/`)
      const json = await resp.json()
      currencies.value = Object.fromEntries(
        Object.entries(json.supported_codes).filter((key) => {
          return currencyKeys.includes(key[1][0])
        })
      )
    } catch (err) {
      error.value = err
    }
  }

  return {
    data,
    loading,
    currencies,
    error,
    handleCurrencies,
    handleCurrencyRates,
    rates,
    rates2,
    rates3
  }
})
