<template>
  <form class="form" @submit.prevent>
    <div class="form-container">
      <input v-model="amountOne" type="number" placeholder="Enter value" @input="handleExchange(currencyTwo, amountOne)">
      <select v-model="currencyOne" @change="handleRates(currencyOne, currencyTwo, amountOne)">
        <option v-for="currency in store.currencies" :key="currency" :value=currency[0] selected="EUR">
          {{ currency[0] }}
          {{ currency[1] }}
        </option>
      </select>
      <router-link class="link" :to="{ name: 'CountryView', params: { id: currencyOne } }">Show countries using {{ currencyOne }}</router-link>
    </div>
    <div class="form-container">
      <input v-model="amountTwo" type="number" @input="handleExchange(currencyTwo, amountTwo)">
      <select v-model="currencyTwo" @change="handleRates(currencyOne, currencyTwo, amountOne)">
        <option v-for="currency in store.currencies" :key="currency" :value=currency[0]>
          {{ currency[0] }}
          {{ currency[1] }}
        </option>
      </select>
      <router-link class="link" :to="{ name: 'CountryView', params: { id: currencyTwo } }">Show countries using {{ currencyTwo }}</router-link>
    </div>
    <i class="btn btn-switch fas fa-sync" @click="handleSwitch()"></i>
  </form>
</template>

<script setup>

import { onMounted, ref } from 'vue';
import { useExchangeStore } from '../stores/exchangeStore'

const store = useExchangeStore()
const currencyOne = ref('EUR')
const currencyTwo = ref('PLN')
const amountOne = ref(1)
const amountTwo = ref()

onMounted(async () => {
  await handleRates(currencyOne.value, currencyTwo.value, amountOne.value)
})

async function handleRates(currency, curr, val) {
  await store.handleCurrencies()
  await store.handleCurrencyRates(currency)
  handleExchange(curr, val)
}

const handleSwitch = async () => {
  let temp = amountOne.value
  let temp2 = currencyOne.value
  currencyOne.value = currencyTwo.value
  amountOne.value = amountTwo.value
  currencyTwo.value = temp2
  amountTwo.value = temp
  await handleRates(currencyOne.value, currencyTwo.value, amountOne.value)
}

const handleExchange = (curr, val) => {
  if (val === amountOne.value) {
    amountTwo.value = (val * store.rates[curr]).toFixed(4)
  }
  else {
    amountOne.value = (val / store.rates[curr]).toFixed(4)
  }
}

</script>
<style scoped lang="scss">
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
}

.form{
  padding-inline:$space-h;
  display: grid;
  &-container{
    display: grid;
    justify-content: center;
    & select,input{
      text-align: center;
      padding: $space-h;
    }
  }
}
.btn-switch{
  grid-column: 1/-1;
}
@media(min-width:700px){
  .form{
    max-width: 800px;
    margin:0 auto;
    grid-template-columns: repeat(3,1fr);
    grid-template-areas:"form1 btn form2";
  }
  .btn-switch{
    grid-area:btn;
    place-self: center;
  }
}
</style>