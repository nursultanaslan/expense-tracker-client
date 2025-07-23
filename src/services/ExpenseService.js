import http from '../http-common';

const BASE_URL = 'http://localhost:8080';

export const getAllExpenses = () =>{
    return http.get(BASE_URL);
}

export const addExpense = (expense) =>{
    return http.post(BASE_URL, expense);
}

export const deleteExpense = (id) =>{
    return http.delete(`${BASE_URL}/${id}`);
}

export const updateExpense = (id, updatedExpense) =>{
    return http.put(`${BASE_URL}/${id}`, updatedExpense);
}

export const getExpenseByID = (id) =>{
    return http.get(`${BASE_URL}/${id}`);
}