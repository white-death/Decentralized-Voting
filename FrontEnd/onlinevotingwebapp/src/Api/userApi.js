import {axiosInstance } from './Index'



const userApi = {
    login:(data) => axiosInstance({
        method: 'post',
        url: '/api/login',
        data: data
      }),
      register:(data) => axiosInstance({
        method: 'post',
        url: '/api/register',
        data: data
      }),
      addVoterId:(data) => axiosInstance({
        method: 'post',
        url: '/api/verify',
        data: data
      }),
      getAddressAgainstVoterId:(data) => axiosInstance({
        method: 'post',
        url: '/api/verify',
        data: data
      }),
      
    }

export default userApi;