<script setup>
import { ref, computed } from 'vue';
import { addItem } from '@/services/cartService';
import { useAccountStore } from '@/stores/account';
import { useRouter } from 'vue-router';

const baseUrl = ref(import.meta.env.VITE_BASE_URL);

const account = useAccountStore();
const router = useRouter();

const props = defineProps({
    item: {
        id: Number,
        imgPath: String,
        name: String,
        price: Number,
        discountPer: Number
    }
});
//const computedItemDiscountPrice = computed(() => (props.item.price - (props.item.price * props.item.discountPer / 100)).toLocaleString() + '원');
const computedItemDiscountPrice = computed(() => (props.item.price * ((100 - props.item.discountPer) * 0.01)).toLocaleString() + '원');

const put = async () => {
    if(!account.state.loggedIn) {
        alert('로그인 해주세요.');
        return;
    }
    const res = await addItem( props.item.id );
    if(res === undefined) { 
        alert('서버에 문제가 있습니다.');
        return; 
    } else if(res.status === 500) {
        alert('이미 장바구니에 담겨져 있습니다.');
    }
    else if(res.status === 200 && confirm('장바구니에 상품을 담았습니다. 장바구니로 이동하시겠습니까?')) {
        //장바구니 화면으로 라우팅
        console.log('카트 담기 성공!');
        router.push('/cart');
    }

}
</script>

<template>
    <router-link to="/detail">
        <div class="card shadow-sm">
            <!-- 상품 사진 aria-label은 영역에 대한 설명 -->
            <span class="img" :style="{backgroundImage: `url(${baseUrl}/pic/item/${props.item.id}/${props.item.imgPath})`}" 
                            :aria-label="`상품사진(${props.item.name})`"></span>                           
            <div class="card-body">
                <p class="card-text">
                    <!-- 상품 이름 -->
                    <span class="me-2">{{  props.item.name }}</span>
                    <!-- 상품 할인율 -->
                    <span class="discount badge bg-danger">{{ props.item.discountPer }}%</span>
                </p>
                <div class="d-flex justify-content-between align-items-center">
                    <button class="btn btn-primary btn-sm" @click="put">장바구니 담기</button>
                    <!-- 상품 정가 (숫자 데이터에 3자리마라 쉼표 표기 >> 천단위 콤마) -->
                    <small class="price text-muted">{{ props.item.price.toLocaleString() }}원</small>
                    <!-- 상품 할인가 -->
                    <small class="real text-danger">{{ computedItemDiscountPrice }}</small>
                </div>
            </div>
        </div>
    </router-link>
</template>

<style lang="scss" scoped>
.card {
    .img {
        display: inline-block;
        width: 100%;
        height: 250px;
        background-size: cover;
        background-position: center;
    }

    .card-body .price {
        text-decoration: line-through;
    }
}
</style>