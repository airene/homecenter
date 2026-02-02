import axios from 'axios'
import { Message } from '@arco-design/web-vue'

const Axios = axios.create()
Axios.interceptors.request.use(
    (config) => {
        let token = sessionStorage.getItem('token')
        if (token) {
            config.headers['Lptoken'] = token
            Cookie.set('token', encodeURIComponent(token))
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)
Axios.interceptors.response.use(
    (res) => {
        return res.data
    },
    (error) => {
        Message.error({
            content: 'System error,contact rd!',
        })
        return Promise.reject(error)
    }
)

// { withCredentials: true } 携带cookie的config

const API_URL = import.meta.env.VITE_APP_API

export const changeUserProfile = (data) => Axios.post(`${API_URL}/inner/userAccount/update`, data)
// report
export const summary = () => Axios.get(`${API_URL}/report/admin/index`)
export const wol = () => Axios.get(`${API_URL}/wol`)
export const wake = (host) => Axios.post(`${API_URL}/wake/${host}`)
export const ipInfo = (host) => Axios.get(`${API_URL}/ipInfo`)
