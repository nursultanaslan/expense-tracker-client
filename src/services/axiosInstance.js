import axios from "axios"

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/',
    headers:{
        'Content-Type' :'application/json',
    },
    timeout: 60000,
    timeoutErrorMessage: 'Sunucu yanıt vermiyor.'

});

export default axiosInstance;