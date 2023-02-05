import axios from '../../axios'

export default {
    getRecommendDay(){
        return axios.get('/personalized?limit=8')
    },
    getDayDisk(){
        return axios.get('/top/album?offset=0&limit=5')
    },
    getRankList(id){
        return axios.get(`/playlist/detail?id=${id}`)
    },
    getResidentSinger(){
        return axios.get('/top/artists?limit=5')
    },
    gerHorRadio(){
        return axios.get('/dj/toplist/hours')
    }
}