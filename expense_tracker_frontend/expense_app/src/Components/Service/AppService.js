import axios from "axios";
import { getToken } from "./AuthService";


const BASE_REST_API_URL = "http://localhost:8080/api/transaction";

axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    config.headers['Authorization'] = getToken();
    console.log("Interceptor called succesfully")
    return config;
  }, function (error) {
    console.log("Interceptor has some error")
    // Do something with request error
    return Promise.reject(error);
  });

export const addTransaction = (transactionDto)=>axios.post(BASE_REST_API_URL,transactionDto);

export const getAllIncomes = ()=>axios.get(BASE_REST_API_URL+"/incomes");

export const getAllExpenses = ()=>axios.get(BASE_REST_API_URL+"/expenses");

export const deleteTransaction = (id)=>axios.delete(BASE_REST_API_URL+'/'+id);

export const getTotalIncome = ()=>axios.get(BASE_REST_API_URL+"/income");

export const getTotalExpese = ()=>axios.get(BASE_REST_API_URL+"/expense");

export const historyApi = ()=>axios.get(BASE_REST_API_URL+"/recent");

export const getAllTransactions = ()=>axios.get(BASE_REST_API_URL);

