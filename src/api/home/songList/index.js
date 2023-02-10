import axios from "../../axios";

export default {
    getAllSongList(cat,offset,limit=35){
        if(!cat){
            cat = '全部'
        }
        if(!offset){
            offset = 0
        }
        return axios(`/top/playlist?limit=${limit}&cat=${cat}&offset=${offset}`)
    }
}