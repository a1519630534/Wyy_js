import axios from "../../axios";


export default{
    getHotDisk(){
        return axios('/top/album?area=ALL&type=hot')
    },
    getTapDiskList(limlt,offset,area){
        return axios(`/album/new?limit=${limlt}&area=${area}&offset=${offset}`)
    }
}