import axios  from "../../axios";


export default{
    getHotList(){   
        return axios('/top/artists')
    },
    getSelTypeList(type,area,initial){
        return axios(`/artist/list?type=${type}&area=${area}&initial=${initial}&limit=80`)
    }
}