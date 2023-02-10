import api from "@/api"

const state = {

    playName: [],
    urlList: []


}

const mutations = {
    SET_PLAY_LIST(state, data) {

        state.playName.push(data)
    },
    SET_PLAY_URL(state, data) {
        state.urlList.push(data)

    },
    RESET_PLAY_DATA(state) {
        state.urlList = [],
            state.playName = []
    }
}

const actions = {
    //点击播放歌单按钮根据歌单ID获取歌单详情
    async getPlayList({ commit }, id) {
        commit('RESET_PLAY_DATA')
        const result = await api.audio.getAudioList(id)
        if (result.code === 200) {
            // console.log(result.playlist.tracks);
            result.playlist.tracks.forEach(item => {

                if (item) {
                    commit('SET_PLAY_LIST', item.name)
                }
            })
            //根据歌单列表的ID遍历每一个ID的歌曲URL
            result.playlist.tracks.forEach(async item => {

                const result = await api.audio.getAudioUrl(item.id)
                if (result.code === 200) {



                    commit('SET_PLAY_URL', result.data[0].url)

                }

            });
        }
    },
    async playOneSonger({commit},data){
        // console.log(id);
        const result = await api.audio.getAudioUrl(data.id)
        if(result.code === 200){
            // console.log(result);
            commit('RESET_PLAY_DATA')
            commit('SET_PLAY_URL',result.data[0].url)
            commit('SET_PLAY_LIST',data.name)
            // console.log(result.data[0].url);
        }
    }
}



const getters = {





}



export default {
    state,
    actions,
    mutations,
    getters
}