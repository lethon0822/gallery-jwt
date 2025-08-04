<script setup>
import { getItems } from '@/services/itemService';
import { onMounted, reactive } from 'vue';
import { useGlobalErrorStore } from '@/stores/global-error';

const globalErrorStore = useGlobalErrorStore();

import Card from '@/components/Card.vue';

const state = reactive({
  items: []
});

onMounted(async () => {
  const res = await getItems();
  if(res.status !== 200) { return; }
  console.log('res.data:', res.data);
  state.items = res.data;
});

/*
이 화면이 마운트될 때 딱 한번 getItems 통신하시고
통신으로 받아온 데이터를 콘솔에 뿌려주시오.
*/
</script>

<template>
  <div class="home">    
    <b-modal v-model="globalErrorStore.state.isShow" ok-only>{{ globalErrorStore.state.errorMessage }}</b-modal>
    <div class="album py-5 bg-light">
      <div class="container">
        <div class="row row-cols-1 row-cols-lg-2 row-cols-xl-3 g-3">
          <div class="col" v-for="item in state.items">
            <card :item="item"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>