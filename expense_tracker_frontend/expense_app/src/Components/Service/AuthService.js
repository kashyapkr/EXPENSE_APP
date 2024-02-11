import axios from "axios";

const AUTH_REST_API_BASE_URL = "http://localhost:8080/api/user"

export const registerApiCall = (userDto)=>axios.post(AUTH_REST_API_BASE_URL+'/register',userDto);

export const loginApiCall  = (loginDto)=>axios.post(AUTH_REST_API_BASE_URL+'/login',loginDto);

export const storeToken = (token)=>localStorage.setItem("token",token);

export const getToken = ()=>localStorage.getItem("token");

export const saveLoginUser = (username)=> {
    sessionStorage.setItem("authenticatedUser",username);
   
};
export const getLoggedInUser = ()=>{  //retrieveing the user 
    const username = sessionStorage.getItem("authenticatedUser");
    return username;
}

export const logout=()=>{
    localStorage.clear();
    sessionStorage.clear();
}