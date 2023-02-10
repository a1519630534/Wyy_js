import axios from "../../axios";

export default{
    getAudioList(id){
        return axios(`/playlist/detail?id=${id}`)
    },
    getAudioUrl(id){
        return axios(`/song/url?id=${id}`)
    }
}