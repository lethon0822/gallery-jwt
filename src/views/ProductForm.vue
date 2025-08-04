<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { addProduct } from '@/services/itemService';

const router = useRouter();

const state = reactive({
    data: {
        name: '',
        price: 0,
        discountPer: 0        
    },
    img: null
});

//파일 선택시 
const handleFileSelected = e => {
    const file = e.target.files[0];
    console.log('file:', file);
    state.img = file;
}

const submit = async () => {
    const formData = new FormData();
    formData.append('img', state.img);
    formData.append('data', new Blob([JSON.stringify(state.data)], { type: 'application/json' }));

    const res = await addProduct(formData);
    console.log('res:', res);
    if(res === undefined || res.status !== 200) {
        alert('에러 발생');
        return;
    }
    router.push('/');
}

</script>

<template>
    <form class="forder-form" @submit.prevent="submit">
         <div class="container">
            <div class="py-5 text-center">
                <div class="h4">
                    <b>상품 등록</b>
                </div>                
            </div>

            <div>
                 <div class="h5 mb-3">
                    <b>상품 정보</b>
                </div>

                <div class="row g-3">
                    <div class="col-12">
                        <label for="name" class="form-label">상품명</label>
                        <input type="text" class="form-control p-3" id="name" v-model="state.data.name">
                    </div>

                    <div class="col-12">
                        <label for="price" class="form-label">가격</label>
                        <input type="number" class="form-control p-3" id="price" v-model="state.data.price">
                    </div>

                    <div class="col-12">
                        <label for="discount" class="form-label">할인율</label>
                        <input type="number" class="form-control p-3" id="discount" v-model="state.data.discountPer">
                    </div>

                    <div class="col-12 pt-1">
                        <label class="form-label">이미지</label>
                        <input type="file" id="img" hidden class="form-control p-3" accept="image/*" 
                                @change="handleFileSelected">
                        <div>
                            <label for="img">파일 선택</label>
                        </div>
                    </div>
                </div>
            </div>
            <div>            
                <button class="w-100 btn btn-primary py-4 mt-4">등록</button>
            </div>
        </div>
    </form>
</template>

<style scoped>

</style>