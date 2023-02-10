import useSetUserInfo from "@/hooks/useSetUserInfo"
import useCookie from "@/hooks/useCookie"
const state = {
    userinfo:{

    }
}


const mutations = {
SET_USER_INFO(state,data){
    state.userinfo=data
},
REMOVE_USER_INFO(state){
    state.userinfo = {}
}
}


const actions={

    //获取到的用户信息存储
    getUserInfo({commit}){
        
            // console.log(useSetUserInfo.getUserInfo());
            const userData = useSetUserInfo.getUserInfo()
            commit('SET_USER_INFO',userData)
        
    },
    //点击退出登录
    singOut({commit}){
        useSetUserInfo.removeUserInfo()
        useCookie.removeCookie()
        commit('REMOVE_USER_INFO')
    }

}


const getters = {

}




export default{
    state,mutations,actions,getters
}