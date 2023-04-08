<template>
  <div>
    <div>
      <div>
        <input v-model="amountOne" type="number" placeholder="Enter value"
          @input="handleExchange(currencyTwo, amountOne)">
        <select v-model="currencyOne"
        @change="handleRates(currencyOne,currencyTwo,amountOne)">
          <option v-for="currency in store.currencies" :key="currency" :value=currency[0] selected="EUR">
            {{ currency[0] }}
            {{ currency[1] }}
          </option>
        </select>
        <router-link :to="{ name: 'CountryView',params:{id:currencyOne} }">Countries using {{currencyOne}}</router-link>
      </div>
      <div>
        <input v-model="amountTwo" type="number" @input="handleExchange(currencyTwo, amountTwo)">
        <select v-model="currencyTwo"
        @change="handleRates(currencyOne,currencyTwo,amountOne)">
          <option v-for="currency in store.currencies" :key="currency" :value=currency[0]>
            {{ currency[0] }}
            {{ currency[1] }}
          </option>
        </select>
        <router-link :to="{name:'CountryView',params:{id:currencyTwo} }">Countries using {{currencyTwo}}</router-link>
      </div>
      <button @click="handleSwitch()">Switch</button>
      <div>
      </div>
    </div>
  </div>
</template>

<script setup>

import { onMounted,ref } from 'vue';
import { useExchangeStore } from '../stores/exchangeStore'

const store = useExchangeStore()
const currencyOne = ref('EUR')
const currencyTwo = ref('PLN')
const amountOne = ref(1)
const amountTwo = ref()

onMounted(async()=>{
await handleRates(currencyOne.value,currencyTwo.value,amountOne.value)
})

async function handleRates(currency,curr,val) {
  await store.handleCurrencies()
  await store.handleCurrencyRates(currency)
    handleExchange(curr,val)
}

const  handleSwitch = async() =>{
  let temp = amountOne.value
  let temp2 = currencyOne.value
  currencyOne.value = currencyTwo.value
  amountOne.value = amountTwo.value
  currencyTwo.value = temp2
  amountTwo.value = temp
  await handleRates(currencyOne.value,currencyTwo.value,amountOne.value)
}

const handleExchange = (curr, val) => {
  if (val === amountOne.value) {
    amountTwo.value = (val * store.rates[curr]).toFixed(4)
  }
  else {
    amountOne.value = (val/store.rates[curr]).toFixed(4)
  }
}

</script>
<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
}
</style>