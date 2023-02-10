import axios from '../axios'

export default {
    getUserSongList(uid){
        return axios.get(`/user/playlist?uid=${uid}`)
    },
    getSongList(id){
       return axios(`/playlist/detail?id=${id}`)
    }
}