<template>
    <div>
        <div class="left-top">
            <a class="hot" href="#">每日推荐</a>
            <ul class="kinds">
                <li><a href="#">华语</a></li>
                <li></li>
                <li><a href="#">流行</a></li>
                <li></li>
                <li><a href="#">摇滚</a></li>
                <li></li>
                <li><a href="#">民谣</a></li>
                <li></li>
                <li><a href="#">电子</a></li>
            </ul>
            <a class="more" href="#">更多</a>
        </div>

        <div class="first-body">
            <ul>
                <li v-for="item,index in recommendList.List">
                    <div>
                        <img style="width: 140px;height: 140px;" :src="item.picUrl" alt="">
                        <a href="#"></a>
                        <div>
                            <span>{{ item.playCount }}</span>
                            <a ></a>
                        </div>
                    </div>
                    <p><a href="#">{{ item.name }}</a></p>
                </li>

            </ul>
        </div>
    </div>
</template>

<script>

import { defineComponent, reactive } from 'vue';
import API from '@/api'
export default defineComponent({

    name: 'Home_Hot',

    setup() {

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


        return {
            getRecommendDay,
            recommendList
        }
    },


    mounted() {
        this.getRecommendDay()

    }

});

</script>

<style lang="less">

</style>