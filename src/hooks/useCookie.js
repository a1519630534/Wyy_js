import Cookies from "js-cookie"

let cookie = 'cookie'

 function setCookie(value){
    if(Cookies.get(cookie)){
        alert('已登录，请不要重复登录')
        return
    }
    Cookies.set(cookie,value)
    localStorage.setItem(cookie,value)
}


 function getCookie(){
    return Cookies.get(cookie)
    
}

 function removeCookie(){
    Cookies.remove(cookie)
    localStorage.removeItem(cookie)
}


export default {
    setCookie,
    getCookie,
    removeCookie,
}