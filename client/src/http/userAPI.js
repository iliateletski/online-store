import { $authHost, $host } from ".";
import iwt_decode from "jwt-decode"

export const registartion = async (email, password) => {
    const{data}  = await $host.post('api/user/registration', {email, password, role: 'ADMIN'});
    localStorage.setItem('token', data.token);
    return iwt_decode(data.token);
}

export const login = async (email, password) => {
    const{data} = await $host.post('api/user/login', {email, password});
    localStorage.setItem('token', data.token);
    return iwt_decode(data.token);
}

export const check = async () => {
    const{data} = await $authHost.get('api/user/auth');
    console.log(data.token)
    localStorage.setItem('token', data.token);
    return iwt_decode(data.token);
}   