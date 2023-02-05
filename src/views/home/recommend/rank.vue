<template>
    <div>
        <div class="left-top">
            <a class="hot" href="#">榜单</a>
            <a class="more" href="#">更多</a>
        </div>
        <div class="third-body">
            <dl>
                <dt>
                    <div class="dt-left">
                        <img src="../../../../public/upload/18696095720518497.png">
                        <a href="javascript:void(0);"></a>
                    </div>
                    <div class="dt-right">
                        <a href="javascript:void(0);">
                            <h3>飙升榜</h3>
                        </a>
                        <a href="javascript:void(0);"></a>
                        <a href="javascript:void(0);"></a>
                    </div>
                </dt>
                <dd>
                    <ol>
                        <li v-for="soaring,index in RankList.soaringList" >
                            <span :class="{'red_span':index<3}">{{index+1}}</span>
                            <a href="javascript:void(0);">{{soaring.al.name}}</a>
                            <div id="11" class="trible">
                                <a href="javascript:void(0);"></a>
                                <a href="javascript:void(0);"></a>
                                <a href="javascript:void(0);"></a>
                            </div>
                        </li>


                    </ol>
                    <div class="forAll">
                        <a href="javascript:void(0);">查看全部></a>
                    </div>
                </dd>
            </dl>
            <dl>
                <dt>
                    <div class="dt-left">
                        <img src="../../../../public/upload/18713687906568048.png">
                        <a href="javascript:void(0);"></a>
                    </div>
                    <div class="dt-right">
                        <a href="javascript:void(0);">
                            <h3>新歌榜</h3>
                        </a>
                        <a href="javascript:void(0);"></a>
                        <a href="javascript:void(0);"></a>
                    </div>
                </dt>
                <dd>
                    <ol>
                        <li v-for="newSong,index in RankList.newSongList">
                            <span :class="{'red_span':index<3}">{{index+1}}</span>
                            <a href="javascript:void(0);">{{newSong.al.name}}</a>
                            <div class="trible">
                                <a href="javascript:void(0);"></a>
                                <a href="javascript:void(0);"></a>
                                <a href="javascript:void(0);"></a>
                            </div>
                        </li>

 
                    </ol>
                    <div class="forAll">
                        <a href="javascript:void(0);">查看全部></a>
                    </div>
                </dd>
            </dl>
            <dl>
                <dt>
                    <div class="dt-left">
                        <img src="../../../../public/upload/18740076185638788.png">
                        <a href="javascript:void(0);"></a>
                    </div>
                    <div class="dt-right">
                        <a href="javascript:void(0);">
                            <h3>原创榜</h3>
                        </a>
                        <a href="javascript:void(0);"></a>
                        <a href="javascript:void(0);"></a>
                    </div>
                </dt>
                <dd>
                    <ol>
                        <li v-for="origina,index in RankList.originaLlist">
                            <span :class="{'red_span':index<3}">{{index+1   }}</span>
                            <a href="javascript:void(0);">{{origina.al.name}}</a>
                            <div class="trible">
                                <a href="javascript:void(0);"></a>
                                <a href="javascript:void(0);"></a>
                                <a href="javascript:void(0);"></a>
                            </div>
                        </li>


                    </ol>
                    <div class="forAll">
                        <a href="javascript:void(0);">查看全部></a>
                    </div>
                </dd>
            </dl>
        </div>
    </div>
</template>

<script>

import { defineComponent,reactive } from 'vue';
import api from '@/api';

export default defineComponent({

    name: 'Home_Rank',
    setup(){

        const RankList = reactive({
            soaringList:[],
            newSongList:[],
            originaLlist:[]
        })


        async function getRankList(){
            //飙升榜
            const result1 = await api.recommend.getRankList(19723756)
            if(result1.code === 200){
                RankList.soaringList = result1.playlist.tracks.slice(0,10)
            }
            //新歌榜
            const result2 = await api.recommend.getRankList(3779629)
            if(result2.code === 200){
                RankList.newSongList = result2.playlist.tracks.slice(0,10)
            }
            //原创绑
            const result3 = await api.recommend.getRankList(2884035)
            if(result3.code === 200){
                RankList.originaLlist = result3.playlist.tracks.slice(0,10)
            }
            // console.log(RankList.soaringList);
        }

        return {
            RankList,
            getRankList
        }
    },
    mounted(){
        this.getRankList()
    }
});

</script>

<style lang="less">

</style>