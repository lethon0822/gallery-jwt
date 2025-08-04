<script setup>
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { ref, reactive, onMounted } from 'vue';
import { getItems } from '@/services/itemService';

const baseUrl = ref(import.meta.env.VITE_BASE_URL);

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

//swiper vue - 공식 사이트: https://swiperjs.com/vue

const state = reactive({
    items: [],
    modules: [Navigation, Pagination, Scrollbar, A11y]
});

const load = async () => {
    const res = await getItems();
    if(res === undefined || res.status !== 200) {
        alert('오류 발생!');
        return;
    }
    state.items = res.data;
}

const onSwiper = swiper => {
    console.log(swiper);
}

const onSlideChange = () => {
    console.log('slide change');
}

onMounted(() => {
    load();
});
</script>

<template>
    <div>
        <h1>Detail.vue</h1>
        <swiper navigation 
                :modules="state.modules"
                :pagination="{ clickable: true }" 
                :slides-per-view="3" 
                :space-between="50" 
                :scrollbar="{ draggable: true }"
                @swiper="onSwiper" 
                @slide-change="onSlideChange">
            <swiper-slide v-for="(item, idx) in state.items" :virtualIndex="idx" :key="idx">
                <img :src="`${baseUrl}/pic/item/${item.id}/${item.imgPath}`" :alt="`상품사진(${item.name})`" :aria-label="`상품사진(${item.name})`">
            </swiper-slide>
        </swiper>
    </div>
</template>

<style scoped>
img { width: 300px; }
</style>