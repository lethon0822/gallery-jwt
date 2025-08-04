<script setup>
import { getItems, removeItem, removeAll } from '@/services/cartService';
import { ref, reactive, onMounted } from 'vue';

const baseUrl = ref(import.meta.env.VITE_BASE_URL);

const state = reactive({ items: [] });
const load = async () => {
    const res = await getItems();
    if(res === undefined || res.status !== 200) {
        return;
    }
    state.items = res.data;
}
const remove = async cartId => {
    const res = await removeItem(cartId);
    if(res === undefined || res.status !== 200) {
        return;
    }
    load();
    //다시 리로딩
    //or
    //방금 삭제한 객체만 state.items에서 삭제한다.
}

const clear = async () => {
    const res = await removeAll();
    if(res === undefined || res.status !== 200) {
        return;
    }
    state.items = [];
}

onMounted(() => {
    load();
});
</script>

<template>
    <div class="cart">
        <div class="container">
            <template v-if="state.items.length">
                <ul class="items">
                    <li v-for="item in state.items">
                        <img :alt="`상품 사진(${item.name})`" :src="`${baseUrl}/pic/item/${item.itemId}/${item.imgPath}`" />
                        <b class="name">{{ item.name }}</b>
                        <span class="price">
                            {{ (item.price - item.price * item.discountPer / 100).toLocaleString() }}원
                        </span>
                        <span class="remove float-end" @click="remove(item.id)" title="삭제">&times;</span>
                    </li>
                </ul>                
                <div class="act d-flex justify-content-around">
                    <button @click="clear" class="btn btn-danger">장바구니 비우기</button>
                    <router-link to="/order" class="btn btn-primary">주문하기</router-link>
                </div>
            </template>
            <template v-else>
                <div class="text-center py-5">장바구니가 비어있습니다.</div>
            </template>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.cart {
    li { border: 1px solid #eee; margin-top: 25px; margin-bottom: 25px; }
    img { width: 150px; height: 150px; }

    .items { list-style: none; margin: 0; padding: 0; }
    .name { margin-left: 25px; }
    .price { margin-left: 25px; }
    .remove { cursor: pointer; font-size: 30px; padding: 5px 15px; }    
}

.act .btn { width: 300px; display: block; padding: 30px 50px; font-size: 20px; }
</style>