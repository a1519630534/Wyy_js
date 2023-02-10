import axios from '../axios'

export default{
    getQrKey(timerstamp){
        return axios(`/login/qr/key?timerstamp=${timerstamp}`)
    },
    getQrCreate(key,timerstamp){
        return axios(`/login/qr/create?key=${key}&qrimg=true&timerstamp=${timerstamp}`)
    },
    getQrStatus(key,timerstamp){
        return axios(`/login/qr/check?key=${key}&timerstamp=${timerstamp}`)
    },
    getAnonimousLogin(){
        return axios('/register/anonimous')
    },
    getLoginStatus(){
        return axios('/login/status')
    }
}