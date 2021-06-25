import axios from 'axios'



const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000',
    
  });
  const blockChainAxiosInstance = axios.create({
      baseURL: 'http://127.0.0.1:8000',
      
    });
  export { axiosInstance, blockChainAxiosInstance};

  // 