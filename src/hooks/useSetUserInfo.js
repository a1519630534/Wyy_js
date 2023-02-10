
let userinfo = 'userinfo'
function setUserInfo(data){
    localStorage.setItem(userinfo,JSON.stringify(data))
}

function getUserInfo(){
    return JSON.parse(localStorage.getItem(userinfo))
}
function removeUserInfo(){
    localStorage.removeItem(userinfo)
}


export default {
    setUserInfo,
    getUserInfo,
    removeUserInfo
}