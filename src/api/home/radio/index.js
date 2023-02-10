import axios from '../../axios'

export default {
    getRadioCategories(){
        return axios('/dj/catelist')
    },
    getRadioTypeList(type){
        return axios(`/dj/recommend/type?type=${type}`)
    },
    getRadioHotList(type){
        return axios(`/dj/radio/hot?cateId=${type}`)
    },
    getRecommentList(){
        return axios('/program/recommend')
    },
    getHotJiemu(){
        return axios('/dj/program/toplist/hours?limit=10')
    },
    getRecommentRadio(){
        return axios('/dj/category/recommend')
    }

}