import axios from "axios";

const BASE_URL = 'http://localhost:8080/api';

export const getAllExpenses = () =>{
    return axios.get(BASE_URL);
}

export const addExpense = (expense) =>{
    return axios.post(BASE_URL, expense);
}

export const deleteExpense = (id) =>{
    return axios.delete(`${BASE_URL}/${id}`);
}

export const updateExpense = (id, updatedExpense) =>{
    return axios.put(`${BASE_URL}/${id}`, updatedExpense);
}
export const getExpenseByID = (id) =>{
    return axios.get(`${BASE_URL}/${id}`);
}