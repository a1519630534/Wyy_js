<template>
    <div class="first-body">
        <ul>
            <li v-for="song, index in songList.songList">
                <div>
                    <img style="width: 140px;height: 140px;" :src="song.coverImgUrl + '?param=500y500'" alt="">
                    <a href="#"></a>
                    <div>
                        <span>{{ song.playCount }}</span>
                        <a href="javascript:;" @click="playSongBody(song.id)"></a>
                        spa
                    </div>
                </div>
                <p><a href="#"></a></p>
                <p><a href="#">{{ song.name }}</a></p>
                <span>by </span>
                <p><a>{{ song.creator.nickname }}</a> <img :src="songList.identityIconUrl[index].identityIconUrl + '?param=500y500'" alt=""
                        style="width: 13px;height: 13px;">
                </p>
                <span></span>
            </li>


        </ul>
    </div>
    <!-- <div class="pages" @click="changePage">
        <a class="pre" href="javascript:;">上一页</a>
        <a class="curr" href="javascript:;">1</a>
        <a href="javascript:;">2</a>
        <a href="javascript:;">3</a>
        <a href="javascript:;">4</a>
        <a href="javascript:;">5</a>
        <a href="javascript:;">6</a>
        <a href="javascript:;">7</a>
        <a href="javascript:;">8</a>
        <a href="javascript:;">9</a>
        <i>...</i>
        <a href="javascript:;">10503</a>
        <a class="next" href="javascript:;">下一页</a>
    </div> -->

  <el-pagination style="margin-left: 200px;" small  background layout="prev, pager,next, total" :total="total" prev-text="上一页"  next-text="下一页"
   @current-change="handleCurrentChange" @prev-click="prevClick" @next-click="nextClick"  :page-size="35"
  />

</template>

<script setup>

import api from '@/api';
import { reactive, onMounted, defineProps, watch,ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';


const route = useRoute()

//歌单列表
const songList = reactive({
    songList: [],
    identityIconUrl: [],

})
let total = ref(0)

async function getSongList(cat, offset) {
    

    if(!cat){
        cat = route.params.cat
    }
    
    const result = await api.songList.getAllSongList(cat, offset)
    if (result.code === 200) {
        songList.songList = result.playlists
        
        total.value = result.total
        songList.identityIconUrl = result.playlists.map(item => {

            return item.creator.avatarDetail || {}
        })
    }
}

//点击风格切换歌单
const props = defineProps(['switchText'])

// console.log(props);
watch(props, (newValue, oldValue) => {
    console.log('改变没了',newValue.switchText);
    getSongList(newValue.switchText)
})


//点击播放按钮播放
const store = useStore()
function playSongBody(id) {
    store.dispatch('getPlayList', id)
}
//点击下一页
function nextClick(i){
    getSongList(props.switchText,i)
}
//点击上一页
function prevClick(i){
    getSongList(props.switchText,i)
}

//点击页数
function handleCurrentChange(i){
    getSongList(props.switchText,i)
}
onMounted(() => {
    getSongList()
})


</script>

<style lang="less">

</style>