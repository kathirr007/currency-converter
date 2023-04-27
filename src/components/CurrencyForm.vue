<template>
  <form class="form" @submit.prevent>
    <div class="form-container">
      <input
        v-model="amountOne"
        type="number"
        placeholder="Enter value"
        @input="handleExchange(currencyTwo, amountOne)"
      />
      <select v-model="currencyOne" @change="handleRates(currencyOne, currencyTwo, amountOne)">
        <option
          v-for="currency in store.currencies"
          :key="currency"
          :value="currency[0]"
          selected="EUR"
        >
          {{ currency[0] }}
          {{ currency[1] }}
        </option>
      </select>
      <router-link class="link" :to="{ name: 'CountryView', params: { id: currencyOne } }"
        >Show countries using {{ currencyOne }}</router-link
      >
    </div>
    <i class="btn btn-switch fas fa-sync" @click="handleSwitch()"></i>
    <div class="form-container">
      <input v-model="amountTwo" type="number" @input="handleExchange(currencyTwo, amountTwo)" />
      <select v-model="currencyTwo" @change="handleRates(currencyOne, currencyTwo, amountOne)">
        <option v-for="currency in store.currencies" :key="currency" :value="currency[0]">
          {{ currency[0] }}
          {{ currency[1] }}
        </option>
      </select>
      <router-link class="link" :to="{ name: 'CountryView', params: { id: currencyTwo } }"
        >Show countries using {{ currencyTwo }}</router-link
      >
    </div>
    <i class="btn btn-switch fas fa-equals" @click="handleSwitch()"></i>
    <div class="form-container">
      <input
        v-model="amountThree"
        type="number"
        @input="handleExchange(currencyTwo, amountThree)"
      />
      <select v-model="currencyThree" @change="handleRates(currencyTwo, currencyThree, amountTwo)">
        <option v-for="currency in store.currencies" :key="currency" :value="currency[0]">
          {{ currency[0] }}
          {{ currency[1] }}
        </option>
      </select>
      <router-link class="link" :to="{ name: 'CountryView', params: { id: currencyThree } }"
        >Show countries using {{ currencyThree }}</router-link
      >
    </div>
  </form>
  <hr style="margin: 1rem 0" />
  <div class="p-inline">
    <h3>Currency latest results:</h3>
    <div class="converted-currency-summary">
      <h4>
        Converted to <strong>{{ currencyThree }}</strong>
      </h4>
      <small
        >Lowest : <strong>{{ minMaxCurrency.minVal.key }}</strong> -
        <strong>{{ minMaxCurrency.minVal.value }}</strong></small
      >
      <small
        >Highest : <strong>{{ minMaxCurrency.maxVal.key }}</strong> -
        <strong>{{ minMaxCurrency.maxVal.value }}</strong></small
      >
    </div>
  </div>
  <div class="currencies-table p-inline">
    <div class="base-currency currency-col">
      Base <template v-if="!isMobile">Currency</template>: [<strong>{{ currencyOne }}</strong
      >]
      <hr style="margin: 0.5rem 0" />
      <ul>
        <li v-for="(value, currency, index) in store.rates" :key="index">
          {{ currency }}
        </li>
      </ul>
    </div>
    <div class="all-currencies currency-col">
      World <template v-if="!isMobile">currencies based on base currency</template>:
      <hr style="margin: 0.5rem 0" />
      <ul>
        <li v-for="(value, currency, index) in store.rates" :key="index">
          {{ value.toFixed(4) }}
        </li>
      </ul>
    </div>
    <div class="converted-currencies currency-col">
      <template v-if="!isMobile">Converted to</template> [<strong>{{ currencyThree }}</strong
      >]
      <hr style="margin: 0.5rem 0" />
      <ul>
        <li v-for="(value, currency, index) in store.rates3" :key="index">
          {{ (store.rates[currency] * (1 / value)).toFixed(4) }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useExchangeStore } from '../stores/exchangeStore'

const store = useExchangeStore()
const currencyOne = ref('USD')
const currencyTwo = ref('AED')
const currencyThree = ref('INR')
const amountOne = ref(1)
const amountTwo = ref()
const amountThree = ref()
const isMobile = ref(window.innerWidth <= 768)

const minMaxCurrency = computed(() => {
  const convertedCurrencies = {}
  for (let key in store.rates) {
    convertedCurrencies[key] = Number((store.rates[key] * (1 / store.rates3[key])).toFixed(4))
    // for (let key2 in store.rates3) {
    // }
  }
  // return convertedCurrencies
  const result = Object.entries(convertedCurrencies).reduce(
    (acc, [key, value]) => {
      if (value > acc.maxVal) {
        acc.maxVal = value
        acc.maxKey = key
      }
      if (value < acc.minVal) {
        acc.minVal = value
        acc.minKey = key
      }
      return acc
    },
    { maxVal: -Infinity, minVal: Infinity }
  )
  const sortedValues = Object.values(convertedCurrencies).sort((a, b) => a - b)

  const minVals = sortedValues
    .slice(0, 5)
    .map((val) => {
      const key = Object.keys(convertedCurrencies).find((key) => convertedCurrencies[key] === val)
      return { key, value: val }
    })
    .sort((a, b) => a.value - b.value)

  const maxVals = sortedValues
    .slice(-5)
    .map((val) => {
      const key = Object.keys(convertedCurrencies).find((key) => convertedCurrencies[key] === val)
      return { key, value: val }
    })
    .sort((a, b) => a.value - b.value)
  return {
    minVal: { key: result.minKey, value: result.minVal },
    maxVal: { key: result.maxKey, value: result.maxVal },
    minVals,
    maxVals
  }
})

onMounted(async () => {
  // await handleRates(currencyOne.value, currencyTwo.value, amountOne.value)
  await handleRates(currencyOne.value, currencyTwo.value, amountOne.value)
})

// async function handleRates(currency, curr, val) {
async function handleRates(curr1, curr2, val) {
  await store.handleCurrencies()
  await store.handleCurrencyRates(curr1, curr2, currencyThree.value)
  handleExchange(curr2, val)
  // handleExchange(curr3, val)
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
  } else {
    amountOne.value = (val / store.rates[curr]).toFixed(4)
  }
  amountThree.value = amountTwo.value * store.rates2[currencyThree.value]
}
</script>
<style scoped lang="scss">
$form-container-width: 250px;
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number'] {
  -moz-appearance: textfield;
}

.form {
  padding-inline: $space-h;
  display: grid;
  &-container {
    display: grid;
    justify-content: center;
    // grid-area: form;
    margin-top: 1rem;
    grid-template-columns: $form-container-width;
    & select,
    input {
      text-align: center;
      padding: $space-h;
    }
    @media (min-width: 768px) {
      margin-top: 0;
    }
  }
}

.converted-currency-summary {
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 1rem;
  text-align: center;
  margin: 1rem 0;
  small + small {
    margin-left: 1rem;
  }
}
.p-inline {
  padding: 1rem;
}
.currencies-table {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  max-height: 45vh;
  overflow-y: auto;
  ul {
    list-style-type: none;
  }
}
.btn-switch {
  // grid-column: 1/-1;
}
@media (min-width: 700px) {
  .form {
    // max-width: 800px;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    grid-template-columns: $form-container-width 50px $form-container-width 50px $form-container-width;
    // grid-template-areas: 'form btn form btn form';
  }
  .btn-switch {
    // grid-area: btn;
    place-self: center;
  }
}
</style>
