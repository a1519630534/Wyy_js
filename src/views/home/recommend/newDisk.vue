<template>
    <div>
        <div class="left-top">
            <a class="hot" href="javascript:;">新碟上架</a>
            <a class="more" href="javascript:" @click="tiaozhuan">更多</a>
        </div>

        <div class="second-body">
            <div class="disk">
                <div>
                    <!-- <div class="carousel2">

                        <ul class="cur-ul">
                            <li v-for="item in diskList.weekData">
                                <div>
                                    <img :src="item.picUrl" style="width: 100px;+height: 100px;">
                                    <a href="#"></a>
                                    <span></span>
                                </div>
                                <p><a href="#">{{item.name}}</a></p>
                                <p><a href="#">{{item.artist.name}}</a></p>
                            </li>

                        </ul>

                    </div> -->
                    <swiper class="carousel2 swiper" :slides-per-view="5" :space-between="50" @swiper="onSwiper"
                        @slideChange="onSlideChange" space-between="0" navigation>
                        <swiper-slide v-for="item,index in diskList.weekData">
                            <ul>
                                <li @mouseenter="showBtn(index,item)" @mouseleave="isShowBtn = -1">
                                    <div>
                                        <img :src="item.picUrl + '?param=500y500'" style="width: 100px;+height: 100px;">
                                        <a href="#" ></a>
                                        <span style="display: block;cursor: pointer;" v-show="isShowBtn===index" @click="playList(item.id)"></span>
                                    </div>
                                    <p><a href="#">{{ item.name }}</a></p>
                                    <p><a href="#">{{ item.artist.name }}</a></p>
                                </li>
                            </ul>
                        </swiper-slide>


                    </swiper>
                    <!-- <a class="carousel2-left" href="javascript:void(0);" style="font-size: 20px;"> &lt </a>
                    <a class="carousel2-right" href="javascript:void(0);" style="font-size: 20px;">></a> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

import { defineComponent, reactive,ref } from 'vue';
import api from '@/api';
import usePlayOne from '@/hooks/usePlayOne'
import { useRouter } from 'vue-router';
export default defineComponent({

    name: 'Home_newDisk',
    components: {
        Swiper,
        SwiperSlide,
    },

    setup() {
        const playList = usePlayOne.playList
        //获取每日新碟
        const route = useRouter()
        const diskList = reactive({
            weekData: []
        })

        async function getDayDisk() {
            const result = await api.recommend.getDayDisk()
            if (result.code === 200) {
                // console.log(result.weekData);
                diskList.weekData = result.weekData.slice(0, 20)
            }
        }


        //点击更多
        function tiaozhuan() {
            route.push('/newdisk')
        }


        const onSwiper = (swiper) => {
            // console.log(swiper);
        };
        const onSlideChange = () => {
            // console.log('slide change');
        }


        // var mySwiper = new Swiper('.swiper', {
        //     autoplay: true,//可选选项，自动滑动
        // })

        let isShowBtn = ref(-1)

        function showBtn(index){
  
            isShowBtn.value = index
        }
        return {
            diskList,
            getDayDisk,
            tiaozhuan,
            onSwiper,
            onSlideChange,
            showBtn,
            isShowBtn,
            playList

        }



    },
    mounted() {
        this.getDayDisk()
        // console.log(this.playList);
    }
});

</script>

<style lang="less">
// .swiper-button-prev{
//     height: 50px;
//     height: 50px;
//     background-color: red;
// }
</style>