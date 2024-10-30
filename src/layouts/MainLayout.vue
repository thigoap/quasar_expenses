<template>
  <q-layout view='hHh lpR fFf'>

    <q-header elevated class='bg-primary text-white'>
      <q-toolbar>
        <q-toolbar-title>
          <q-icon name='payments' /> 
          Despesas
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-form
        @submit='onSubmit'
        class='q-px-sm'>
        <div class='q-pa-sm'>
          <q-date
            v-model='date'
            minimal          
          />
        </div>
        <div>
          <q-input
            v-model='item'
            label='Despesa'
            class='q-py-xs'
            outlined
            dense
          >
          </q-input>
        </div>
        <div>
          <q-input
            v-model='amount'
            label='Valor'
            class='q-py-xs'
            type='number'
            step='0.01'
            min='0'
            outlined
            dense
          >
          </q-input>
        </div>
        
        <q-select
          v-model='method'
          label='Pagamento'
          :options='options'
          outlined
          dense
        />
        
      </q-form>
      </q-page-container>

      <div class='q-pt-sm row justify-evenly'>
        <q-btn
          @click='save'
          label='Salvar'
          color='primary'>
        </q-btn>
        <q-btn
          @click='erase'
          label='Apagar'
          >
        </q-btn>
      </div>
  </q-layout>
</template>

<script setup>
defineOptions({
  name: 'MainLayout'
})

import { ref } from 'vue'
import axios from 'axios'

const date = ref(null)
const item = ref(null)
const amount = ref(null)
const method = ref(null)

const options = [
  'Crédito',
  'Débito',
  'PIX',
  'Dinheiro'
]

const erase = () => {
  item.value = ''
  amount.value = ''
  method.value = ''
}

const save = () => {
  const paramsurl = process.env.BASE_URL
    +'date='+date.value
    +'&item='+item.value
    +'&amount='+amount.value
    +'&method='+method.value

  axios.post(paramsurl)
    
  erase()
}

</script>
