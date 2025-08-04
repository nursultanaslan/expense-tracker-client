import axios from "axios";         //initializes axios with HTTP BaseURL and headers.

export default axios.create({
    baseURL: 'http://localhost:8080',
    headers:{
        'Content-Type' :'application/json',
    },
    timeout: 60000,
    timeoutErrorMessage: 'Sunucu yanıt vermiyor.'

});

