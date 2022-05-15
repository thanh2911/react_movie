import axios from "axios";
import queryString from 'query-string';
import apiConfigs from "./apiConfig";

const axiosClient = axios.create({
    baseURL: apiConfigs.baseUrl,
    headers: {
        'Content-Type' : 'application/json'
    },
    paramsSerializer : 
        params => queryString.stringify({...params,api_key:apiConfigs.apiKey})
})


axiosClient.interceptors.request.use(async(config) => config );

axiosClient.interceptors.response.use((response) => {
    if(response && response.data) {
        return response.data ;
    }

    return response ;
},(err) => {
    throw err;
});

export default axiosClient