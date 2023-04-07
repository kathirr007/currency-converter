<template>
  <div>
    <div>
      <div>
        <input v-model="store.amountOne" type="number" placeholder="Enter value"
          @input="handleExchange(store.currencyTwo, store.amountOne)">
        <select v-model="store.currencyOne"
        @change="handleRates(store.currencyOne,store.currencyTwo,store.amountOne)">
          <option v-for="currency in store.currencies" :key="currency" :value=currency[0] selected="EUR">
            {{ currency[0] }}
            {{ currency[1] }}
          </option>
        </select>
      </div>
      <div>
        <input v-model="store.amountTwo" type="number" @input="handleExchange(store.currencyTwo, store.amountTwo)">
        <select v-model="store.currencyTwo"
        @change="handleRates(store.currencyOne,store.currencyTwo,store.amountOne)">
          <option v-for="currency in store.currencies" :key="currency" :value=currency[0]>
            {{ currency[0] }}
            {{ currency[1] }}
          </option>
        </select>
      </div>
      <button @click="handleExchange(store.currencyTwo, store.amountOne)">Exchange</button>
      <button @click="handleSwitch()">Switch</button>
      <div>
      </div>
    </div>
  </div>
</template>

<script setup>

import { onMounted } from 'vue';
import { useExchangeStore } from '../stores/exchangeStore'

const store = useExchangeStore()


onMounted(async()=>{
await handleRates(store.currencyOne,store.currencyTwo,store.amountOne)
})

async function handleRates(currency,curr,val) {
  await store.handleCurrencies()
  await store.handleCurrencyRates(currency)
    handleExchange(curr,val)
}

const  handleSwitch = async() =>{
  let temp = store.amountOne
  let temp2 = store.currencyOne
  store.currencyOne = store.currencyTwo
  store.amountOne = store.amountTwo
  store.currencyTwo = temp2
  store.amountTwo = temp
  await handleRates(store.currencyOne,store.currencyTwo,store.amountOne)
}

const handleExchange = (curr, val) => {
  if (val === store.amountOne) {
    store.amountTwo = (val * store.rates[curr]).toFixed(4)
  }
  else {
    store.amountOne = (val/store.rates[curr]).toFixed(4)
  }
}

</script>
<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>