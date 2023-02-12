import store from '@/store'

function play(id,name){
    const data = {
        id:id,
        name:name
    }
    // console.log(data);
    store.dispatch('playOneSonger',data)
}

function playList(id){
    
    // console.log(data);
    store.dispatch('getPlayList',id)
}

export default {
    play,
    playList
}