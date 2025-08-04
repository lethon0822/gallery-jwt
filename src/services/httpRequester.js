import axios from 'axios';
import { reissue } from './accountService';
import { useAccountStore } from '@/stores/account';
import { useGlobalErrorStore } from '@/stores/global-error';

axios.defaults.baseURL = `${import.meta.env.VITE_BASE_URL}/api/v1`;

axios.interceptors.response.use( res => res, async err => {
    console.log('err: ', err);
    if(err.response) {
        const accountStore = useAccountStore();
        if(err.response.status === 401 && accountStore.isSigned) { //401에러인데 로그인이 되어 있는 상태라면
            try {
                await reissue();

                return await axios.request(err.config); //이전에 시도했던 요청으로 다시 요청
            } catch(e) {
                accountStore.logout();
            }
        }
    }
    return Promise.reject(err);
});

export default axios;