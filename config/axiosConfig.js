import axios from 'axios'
import {useStore} from "../config/storeConfig"
const axiosApiInstance = axios.create()

// const userToken = useStore((state)=>state.token)
const userToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjU4ODI0YTI2ZjFlY2Q1NjEyN2U4OWY1YzkwYTg4MDYxMTJhYmU5OWMiLCJ0eXAiOiJKV1QifQ.eyJyb2xlIjoiYWRtaW4iLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdGVzdC1oYWNraXRiYSIsImF1ZCI6InRlc3QtaGFja2l0YmEiLCJhdXRoX3RpbWUiOjE2Nzg4NDI5MjIsInVzZXJfaWQiOiJRUm1WVHFwWEJPZE1YZDVPdjRVQXNURTFScmYyIiwic3ViIjoiUVJtVlRxcFhCT2RNWGQ1T3Y0VUFzVEUxUnJmMiIsImlhdCI6MTY3ODg0MjkyMiwiZXhwIjoxNjc4ODQ2NTIyLCJlbWFpbCI6ImpybWVudGE0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJqcm1lbnRhNEBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.wIDDEXKCBzra-fFpNsIKWNMdcDSrT2rJcfjmtxy-l6wCzqU0Nckvoh5qj7K5rhQbLAV7ijHdGyCPvBBaieoDyhZS_DkK2n2s3LOY-SVPtrgYprTCFO_KfeZSgqKNaLJWWILkDcM1ezzJdK3YtyU5nAHIGUMCxvZzwkmtFcPAgCgMV_wXvTMApeDR6trnjNS67VYwKwTp_e-kyIRmJ3JCq5e-j4IEOr6vbYfj52kIDxXo-gDdmnjEtUC-6DaSf3As0UHlsj_v40pHW2WuQIhDBb_6TnHtCMP_4RXnw1e4MJirvfjdOxTjbS-eAmeRkwHm369LLj3GVVySRoWfw4b-iQ'

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
        if(error.response.status===401 && error.response.data.error.code==='auth/id-token-expired' && !originalRequest._retry){
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