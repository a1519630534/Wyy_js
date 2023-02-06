<template>
    <div class="first-body">
        <ul>
            <li v-for="song, index in songList.songList">
                <div>
                    <img style="width: 140px;height: 140px;" :src="song.coverImgUrl" alt="">
                    <a href="#"></a>
                    <div>
                        <span>25万</span>
                        <a href="#"></a>
                    </div>
                </div>
                <p><a href="#"></a></p>
                <p><a href="#">{{ song.name }}</a></p>
                <span>by </span>
                <p><a href="#" style="
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;width: 50px">{{ song.creator.nickname }}</a> <img
                        :src="songList.identityIconUrl[index].identityIconUrl" alt="" style="width: 13px;height: 13px;">
                </p>
                <span></span>
            </li>


        </ul>
    </div>
</template>

<script setup>

import api from '@/api';
import { reactive, onMounted } from 'vue';

const songList = reactive({
    songList: [],
    identityIconUrl: []
})

async function getSongList(cat, offset) {
    const result = await api.songList.getAllSongList(cat, offset)
    if (result.code === 200) {
        songList.songList = result.playlists
        songList.identityIconUrl = result.playlists.map(item => {

            return item.creator.avatarDetail || {}
        })
    }
}

onMounted(() => {
    getSongList()
})


</script>

<style lang="less">

</style>