import axios from 'axios'
import {useStore} from "../config/storeConfig"
const axiosApiInstance = axios.create()

const userToken = useStore((state)=>state.token)


axiosApiInstance.interceptors.request.use(
    async config =>{
        config.headers = {
            'Authorization': `Bearer ${userToken}` 
        }
        return config
    },
    error =>{
        Promise.reject(error)
    }
)

axiosApiInstance.interceptors.response.use(
    (response)=>{
        return response
    },
    async (error)=>{
        const originalRequest = error.config
        if(error.response.status===401 && error.response.data.code==='auth/id-token-expired' && !originalRequest._retry){
            originalRequest._retry = true
            const access_token = ''//TODO: get refresh token
            //TODO: UPDATE STORE TOKEN
            axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`
            return axiosApiInstance(originalRequest)
        }
        return Promise.reject(error)
    }
)
//TODO: add middleware
module.exports = {axiosApiInstance}