import axios from "../axios";

export default {
    addSong(id,listid){
        return axios(`/playlist/tracks?op=add&pid=${listid}&tracks=${id}`)
    }
}