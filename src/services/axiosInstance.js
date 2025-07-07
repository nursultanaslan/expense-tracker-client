import axios from "axios"

const axiosInstance = axios.create({
    baseURL: 'https://expense-tracker-app-66ab31bfb3a8.herokuapp.com/api',
    headers:{
        'Content-Type' :'application/json',
    },
    timeout: 60000,
    timeoutErrorMessage: 'Sunucu yanıt vermiyor.'

});

export default axiosInstance;