<template>
    <div class="ranking">
        <div class="rank-body">
            <div class="rank-left">
                <h3>云音乐特色榜</h3>
                <ul>
                    <li :class="{first_li_bg:defaindex === index}" v-for="List,index in Rank.rankList " @click="swIndex(index,List.id)" >
                        <img :src="List.coverImgUrl" alt="">
                        <p>{{ List.updateFrequency }}</p>
                        <p>{{List.name}}</p>
                    </li>

                </ul>
                <h3>全球媒体榜</h3>
                <ul>
                    <li :class="{first_li_bg:glDefaindex === index}" v-for="global,index in Rank.globalList" @click="swGlIndex(index,global.id)">
                        <img :src="global.coverImgUrl" alt="">
                        <p>{{ global.updateFrequency }}</p>
                        <p>{{global.name}}</p>
                    </li>


                </ul>
            </div>

            <Rank_right :listId="listId"></Rank_right>

        </div>
    </div>
</template>

<script>

import { defineComponent,reactive,ref } from 'vue';
import Rank_right from './rank_right.vue';
import api from '@/api'
// import rank_right from './rank_right.vue';
export default defineComponent({
    name: "rank",
    components: { Rank_right },


    setup(){

        //存储榜单列表
        const Rank = reactive({
            rankList:[],
            globalList:[]
        })

        //请求榜单列表函数

        async function getRankList(){
            const result = await api.rank.getAllRankList()
            if(result.code === 200){
                // console.log(result);
                Rank.rankList = result.list.slice(0,4)
                Rank.globalList = result.list.slice(5,15)
            }
        }


        let listId = ref(19723756)
        //点击左边排行榜切换背景色
        let defaindex = ref(0)
        let glDefaindex = ref(-1)
        function swIndex(index,id){
            glDefaindex.value = -1
            defaindex.value = index
            listId.value = id
            // console.log(listId.value);
            // console.log(defaindex.value  );
        }

        function swGlIndex(index,id){
            defaindex.value =-2
            glDefaindex.value = index
            listId.value = id
            // console.log(listId.value);
            // console.log(defaindex.value  );
        }


        return {
            Rank,
            getRankList,
            swIndex,
            swGlIndex,
            defaindex,
            listId,
            glDefaindex
        }
    },
    mounted(){
        this.getRankList()
    }
});

</script>

<style lang="less">

</style>