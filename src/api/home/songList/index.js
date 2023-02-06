import axios from "../../axios";

export default {
    getAllSongList(cat,limit=35,offset){
        if(!cat){
            cat = ''
        }
        if(!offset){
            offset = ''
        }
        return axios(`/top/playlist?limit=${limit}&cat=${cat}&offset=${offset}`)
    }
}