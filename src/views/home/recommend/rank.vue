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
                        <a href="javascript:;" @click="playRank(1)"></a>
                        <a href="javascript:;"></a>
                    </div>
                </dt>
                <dd>
                    <ol>
                        <li v-for="soaring, index in RankList.soaringList" @mouseenter="showBtn(index)"
                            @mouseleave="isShowBtn = -1">
                            <span :class="{ 'red_span': index < 3 }">{{ index+ 1}}</span>
                            <a href="javascript:void(0);">{{ soaring.al.name }}</a>
                            <div id="11" class="trible" v-show="isShowBtn === index">
                                <a href="javascript:void(0);" @click="usePlayOne.play(soaring.id,soaring.name)"></a>
                                <a href="javascript:void(0);"></a>
                                <a href="javascript:void(0);" @click="subSong(soaring.id,19723756)"></a>
                            </div>
                        </li>


                    </ol>
                    <div class="forAll">
                        <a href="javascript:void(0);" @click="swRank(19723756)">查看全部></a>

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
                        <a href="javascript:void(0);" @click="playRank(2)"></a>
                        <a href="javascript:void(0);"></a>
                    </div>
                </dt>
                <dd>
                    <ol>
                        <li v-for="newSong, index in RankList.newSongList" @mouseenter="showBtn1(index)"
                            @mouseleave="isShowBtn1 = -1">
                            <span :class="{ 'red_span': index < 3 }">{{ index+ 1}}</span>
                            <a href="javascript:void(0);">{{ newSong.al.name }}</a>
                            <div class="trible" v-show="isShowBtn1 === index">
                                <a href="javascript:void(0);" @click="usePlayOne.play(newSong.id,newSong.name)"></a>
                                <a href="javascript:void(0);"></a>
                                <a href="javascript:void(0);" @click="subSong(newSong.id,3779629)"></a>
                            </div>
                        </li>


                    </ol>
                    <div class="forAll">
                        <a href="javascript:void(0);" @click="swRank(3779629)">查看全部></a>
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
                        <a href="javascript:void(0);" @click="playRank(3)"></a>
                        <a href="javascript:void(0);"></a>
                    </div>
                </dt>
                <dd>
                    <ol>
                        <li v-for="origina, index in RankList.originaLlist" @mouseenter="showBtn2(index)"
                            @mouseleave="isShowBtn2 = -1">
                            <span :class="{ 'red_span': index < 3 }">{{ index+ 1 }}</span>
                            <a href="javascript:void(0);">{{ origina.al.name }}</a>
                            <div class="trible" v-show="isShowBtn2 === index">
                                <a href="javascript:void(0);" @click="usePlayOne.play(origina.id,origina.name)"></a>
                                <a href="javascript:void(0);"></a>
                                <a href="javascript:void(0);" @click="subSong(origina.id,2884035)"></a>
                            </div>
                        </li>


                    </ol>
                    <div class="forAll">
                        <a href="javascript:void(0);" @click="swRank(2884035)">查看全部></a>
                    </div>
                </dd>
            </dl>
        </div>
    </div>
    <subSongList v-if="isShowAddMenu" :subInfo="addSongId"></subSongList>
</template>

<script>

import { defineComponent, reactive, ref } from 'vue';
import api from '@/api';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import usePlayOne from '@/hooks/usePlayOne';
import subSongList from '@/components/subSongList.vue';

export default defineComponent({

    name: 'Home_Rank',
    components:{subSongList},
    setup() {

        const RankList = reactive({
            soaringList: [],
            newSongList: [],
            originaLlist: []
        })

        let isShowBtn = ref(-1)
        let isShowBtn1 = ref(-1)
        let isShowBtn2 = ref(-1)
        async function getRankList() {
            //飙升榜
            const result1 = await api.recommend.getRankList(19723756)
            if (result1.code === 200) {
                RankList.soaringList = result1.playlist.tracks.slice(0, 10)
            }
            //新歌榜
            const result2 = await api.recommend.getRankList(3779629)
            if (result2.code === 200) {
                RankList.newSongList = result2.playlist.tracks.slice(0, 10)
            }
            //原创绑
            const result3 = await api.recommend.getRankList(2884035)
            if (result3.code === 200) {
                RankList.originaLlist = result3.playlist.tracks.slice(0, 10)
            }
            // console.log(RankList.soaringList);
        }

        //点击播放按钮
        const store = useStore()
        function playRank(i) {
            if (i === 1) {
                store.dispatch('getPlayList', 19723756)
            } else if (i === 2) {
                store.dispatch('getPlayList', 3779629)
            } else {
                store.dispatch('getPlayList', 2884035)

            }
        }

        //点击查看更多切换到榜单路由
        const router = useRouter()
        function swRank(id) {
            router.push({
                name: 'rank',
                params: { id: id }
            })
        }

        //鼠标移入显示按钮
        function showBtn(index) {
            isShowBtn.value = index
            // console.log(index);
        }
        function showBtn1(index) {
            isShowBtn1.value = index
            // console.log(index);
        }
        function showBtn2(index) {
            isShowBtn2.value = index
            // console.log(index);
        }








        //点击收藏歌曲
        let isShowAddMenu =  ref(0)
        const addSongId  =  ref(0)
        function subSong(id){

            isShowAddMenu.value = 1
            addSongId.value = id


        }



        return {
            addSongId,
            isShowAddMenu,
            RankList,
            getRankList,
            playRank,
            swRank,
            showBtn,
            showBtn1,
            showBtn2,
            isShowBtn,
            isShowBtn1,
            isShowBtn2,
            usePlayOne,
            subSong
        }
    },
    mounted() {
        this.getRankList()
    }
});

</script>

<style lang="less">

</style>