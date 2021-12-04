import { apiUrl } from "../config.json";
export function login({email, password}){
    return fetch(apiUrl + '/login', {
        method: 'POST',
        body: JSON.stringify({email,password}),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });
}
export function logout(){
    localStorage.removeItem("user");
}
export function loginWithJwt(jwt) {
    // localStorage.setItem(tokenKey, jwt);
}
export function authUser(){
   let user=JSON.parse(localStorage.getItem("user"));
    // try {
    //     let jwt = localStorage.getItem("token");
    //     return jwtDecode(jwt);

    // } catch (ex) {
    //     return null
    // }
    return user;
}
export function getJwt(){
    // return localStorage.getItem(tokenKey);
}

export default {
    login,
    loginWithJwt,
    logout,
    authUser,
    getJwt
}