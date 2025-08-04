<script setup>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import { watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAccountStore } from './stores/account';
import { check } from './services/accountService';

const route = useRoute();
const account = useAccountStore();

</script>

<template>
    <Header />
    <router-view></router-view>
    <Footer />
</template>

<style scoped>

</style>