import axios  from "../../axios";

export default{
    getAllRankList(){
        return axios('/toplist')
    },
    getRankListInfo(id){
        return axios(`/playlist/detail?id=${id}`)
    },
    getRankComment(id,pageNo){
        // console.log(123);
        return axios(`/comment/new?type=2&id=${id}&sortType=2&pageNo=${pageNo}`)
        
    }
}