<template>
    <div>
        <div class="left-top">
            <a class="hot" href="javascript:;">每日推荐</a>
            <ul class="kinds" @click="catJump">
                <li><a href="javascript:;">华语</a></li>
                <li></li>
                <li><a href="javascript:;">流行</a></li>
                <li></li>
                <li><a href="javascript:;">摇滚</a></li>
                <li></li>
                <li><a href="javascript:;">民谣</a></li>
                <li></li>
                <li><a href="javascript:;">电子</a></li>
            </ul>
            <a class="more" ><router-link to="/songlist">更多</router-link></a>
        </div>

        <div class="first-body">
            <ul>
                <li v-for="item,index in recommendList.List">
                    <div>
                        <img style="width: 140px;height: 140px;" :src="item.picUrl" alt="">
                        <a href="javascript:;"></a>
                        <div>
                            <span>{{ item.playCount }}</span>
                            <a @click="playMusic(item)"></a>
                        </div>
                    </div>
                    <p><a href="javascript:;">{{ item.name }}</a></p>
                </li>

            </ul>
        </div>
    </div>
</template>

<script>

import { defineComponent, reactive } from 'vue';
import API from '@/api'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
export default defineComponent({

    name: 'Home_Hot',

    setup() {

        const router = useRouter()
        const store = useStore()
        // 存储数据
        const recommendList = reactive({
            List: []
        })



        // 获取每日推荐列表
        async function getRecommendDay() {
            const result = await API.recommend.getRecommendDay()
            if (result.code === 200) {
                recommendList.List = result.result
                // console.log(recommendList.List);
            }
        }
        function playMusic(i){
            // console.log(i.name);
            // console.log(store);
            store.dispatch('getPlayList',i.id)
        }

        //点击标签跳转歌单cat
        function catJump(event){
            router.push({
                name:'songlist',
                params:{cat:event.target.innerHTML}
            })
        }




        return {
            getRecommendDay,
            recommendList,
            playMusic,
            catJump
        }
    },


    mounted() {
        this.getRecommendDay()

    }

});

</script>

<style lang="less">

</style>