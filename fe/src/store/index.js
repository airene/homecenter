import { defineStore } from 'pinia' // noinspection JSUnusedGlobalSymbols
export const useStore = defineStore({
    id: 'store',
    state: () => ({
        isAdmin: false, //no-used
    }),
    getters: {
        getUserEventDict() {
            return { account_login: '登录', daily_report_viewing: '报告查看', daily_report_viewing_end: '关闭报告', live_begin: '开播', live_end: '关播' }
        },
    },
    actions: {
        actionAppList() {
            /*api.getEnvirList().then((res) => {
                console.log(res)
            })*/
        },
    },
})
