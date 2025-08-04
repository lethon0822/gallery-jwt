import axios from 'axios';
import { reissue } from './accountService';
import { useAccountStore } from '@/stores/account';
import { useGlobalErrorStore } from '@/stores/global-error';

axios.defaults.baseURL = `${import.meta.env.VITE_BASE_URL}/api/v1`;

axios.interceptors.response.use( res => res, async err => {
    console.log('err: ', err);
    if(err.response) {

    }
    return Promise.reject(err);
});

export default axios;