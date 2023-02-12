<template>
    <div class="sub_main" v-if="isShow">
        <div class="mark"></div>
        <div class="body" style="width: 500px;">
            <div class="top">
                <span>添加到歌单</span>

                <span @click="isShow = 0">X</span>
            </div>
            <div class="main">
                <ul>
                    <li class="clearfix" v-for="item in myCreateList" @click="addSubSong(item.id)">
                        <img :src="item.coverImgUrl + '?param=500y500'" alt="">
                        <div>
                            <span>{{ item.name }}</span>
                            <span>{{ item.trackCount }}首</span>
                        </div>
                    </li>




                </ul>
            </div>
        </div>
    </div>
</template>

<script>

import api from '@/api';
import { defineComponent, ref,watch } from 'vue';
import { useStore } from 'vuex';
import useGetUserId from '@/hooks/useGetUserId'

export default defineComponent({

    props:['subInfo'],

    name: 'App',
    setup() {
        
        
        const store = useStore()
        let isShow = ref(1)

    
        const myCreateList = ref([])


        //    获取用户创建的歌单
        async function getUserCreateList() {
            let id = useGetUserId()
            // console.log(store.state.userinfo.userinfo);
            const result = await api.myMusic.getUserSongList(id)
            if (result.code === 200) {
                // console.log(result);
                // myCreateList.value = result.playlist
                myCreateList.value = result.playlist.filter(item => {
                    return !item.subscribed
                })
            }
        }


         //发送接收props后的请求
        async function addSubSong(id){
            
            const result = await api.mySongList.addSong(this.subInfo,id)
            // console.log(result);
            if(result.status === 200){
                isShow.value = 0
            }
        }


        return {
            isShow,
            getUserCreateList,
            myCreateList,
            addSubSong

        }
    },
    mounted() {
        this.getUserCreateList()
        //发送接收props的请求
    }

});

</script>

<style lang="less">
.sub_main {
    .mark {
        display: block;
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1;
        background-color: #000;
        opacity: 0;
    }

    .body {
        width: 500px;
        height: 500px;
        background-color: white;
        position: fixed;
        top: 150px;
        left: 566px;
        z-index: 2;

        .top {
            background-color: #333;
            height: 30px;
            width: 100%;

            span {
                &:nth-child(1) {
                    float: left;
                    color: white;
                    font-size: 15px;
                    padding: 5px 10px;

                }



                &:nth-child(2) {

                    cursor: pointer;
                    float: right;
                    color: white;
                    font-size: 15px;
                    padding: 5px 10px;
                }
            }
        }

        .main {
            overflow: auto;
            height: 450px;
            // text-align: center;
            margin-top: 20px;
            position: relative;

            ul {
                // display: flex;
                // flex-direction: column;

                li {
                    &:hover {
                        background-color: #e6e6e6;
                    }

                    cursor: pointer;
                    display: block;

                    margin: 10px 20px;

                    img {
                        float: left;
                        width: 40px;
                        height: 40px;
                    }

                    div {
                        width: 300px;
                        padding-left: 10px;
                        float: left;

                        span {
                            display: block;
                        }
                    }
                }
            }
        }
    }

}






.clearfix:after {
    content: "020";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
}

.clearfix {
    /* 触发 hasLayout */
    zoom: 1;
}
</style>