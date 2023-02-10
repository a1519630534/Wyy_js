<template>
    <div class="play_q ">
        <div class="play_body carousel_main">
            <div class="play_info">
                <a href="jkavascript:;" @click="nextPlay(0)">上一首</a>
                <a href="jkavascript:;" @click="nextPlay(1)" style="padding-left: 10px;">下一首</a>
            </div>
            <audio class="play_main" preload="auto" autoplay controls :src="playUrl[playIndex] || ''"
                style="margin-left: 80px;height: 20px;margin-top: 15px;">

                <!-- <source src="playUrl.url" type="audio/mpeg">
                <source src="playUrl.url" type="audio/ogg"> -->
            </audio>
            <div style="color: white;margin-left: 50px; float: left;line-height: 50px;font-size: 14px;">正在播放：{{
                playName[playIndex]
            }}</div>
        </div>
    </div>
</template>

<script>

import { defineComponent, reactive, ref, computed, watch } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({

    name: 'App',
    setup() {

        let playIndex = ref(0)

        const store = useStore()

        //获取歌单
        let playUrl = computed(() => {
            // if (store.state.audio.urlList === []) {

            //     return [{ url: '' }]
            // }

            return store.state.audio.urlList
        })


        //获取歌单名字

        let playName = computed(() => {

            // console.log(playName);
            return store.state.audio.playName || [{ name: '' }]
        })


        //切换上下歌曲
        function nextPlay(type) {
            if (type === 1) {
                playIndex.value++
                if (playIndex.value > playUrl.length) playIndex.value = playUrl.length
                console.log(playIndex.value);
            } else {
                playIndex.value--
                // console.log(playIndex.value);
                if (playIndex.value < 0) playIndex.value = 0
            }
        }
        return {
            playIndex,
            nextPlay,
            playUrl,
            playName

        }
    },
});

</script>

<style lang="less">
.play_q {
    background-color: #333;
    position: fixed;
    bottom: 0;
    width: 100%;

    .play_body {
        .play_info {
            float: left;

            a {
                text-align: center;
                line-height: 50px;
                font-size: 14px;
                color: white;
            }
        }
        .play_main{
            float: left;
        }
    }
}

/* .play_q{

width: 100%;
height: 50px;
background-color: #333;
position: fixed;
bottom: 0px;
}

footer .play_q .play_body .play_info{
float: left;

  
}
footer .play_q .play_body .play_info a{

text-align: center;
line-height: 50px;
font-size: 14px;
color: white;
    
}
footer .play_q .play_body .play_main{
float: left;
    
} */
</style>