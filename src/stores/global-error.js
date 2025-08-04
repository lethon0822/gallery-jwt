import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useGlobalErrorStore = defineStore('globalError', () => {
    const state = reactive({
        errorMessage: null,
        isShow: false
    })

    const setErrorMessage = val => {
        console.log('val:', val)
        state.errorMessage = val;
        state.isShow = true;
    }

    return { state, setErrorMessage }
})