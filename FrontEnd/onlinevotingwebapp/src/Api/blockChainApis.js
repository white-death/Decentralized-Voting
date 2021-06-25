import { blockChainAxiosInstance } from "./Index"

const blockchainApi = {
    getInfo: () => blockChainAxiosInstance({
        method: 'get',
        url: '/allInfo',
      }), 
    getAddressAgainstId: (voterId) => blockChainAxiosInstance({
        method: 'get',
        url: `/address?govID=${voterId}`,
      }), 
    doVote: (data) =>  blockChainAxiosInstance({
      method: 'post',
      url: `/vote`,
      data: data
    }), 
    }

    export default blockchainApi;
