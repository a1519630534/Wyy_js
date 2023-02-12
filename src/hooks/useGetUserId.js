


export default function getUserId(){
    return JSON.parse(localStorage.getItem('userinfo')).userId
}