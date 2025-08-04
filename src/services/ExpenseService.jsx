import http from '../http-common';

const BASE_URL = 'http://localhost:8080';  

// api'ye http istekleri gonderen functionlar
export const getAllExpenses = () =>{
    return http.get(BASE_URL);
}

export const getExpenseByID = (id) =>{
    return http.get(`${BASE_URL}/${id}`);
}

export const addExpense = (expense) =>{
    return http.post(BASE_URL, expense);
}

export const updateExpense = (id, updatedExpense) =>{
    return http.put(`${BASE_URL}/${id}`, updatedExpense);
}

export const deleteExpense = (id) =>{
    return http.delete(`${BASE_URL}/${id}`);
}



