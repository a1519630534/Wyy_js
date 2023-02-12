<template>
    <div class="findMusic">

        <div class="find-top">
            <div class="carousel">
                <!-- 左右箭头 -->
                <!-- <a href="javascript:void(0);" class="arrow-left"><span></span></a>
                <a href="javascript:void(0);" class="arrow-right"><span></span></a> -->
                <!-- 小圆点 -->
                <ol class="circle"></ol>
                <!-- 轮播图片 -->
                <div class="carousel_main">
                    <el-carousel class="carousel-box" indicator-position="outside">
                        <el-carousel-item v-for="item in Banner.bannerList" :key="item">
                            <img :src="item.imageUrl + '?param=500y500'" alt="" style="width: 730px;height: 284px;">
                        </el-carousel-item>
                    </el-carousel>
                    <!-- <div class="carousel-box">
                <ul>
                    <li :id="index" :class="{'current':index === index}" v-for="bannerList,index in Banner.bannerList"><a href="#"><img :src="bannerList.imageUrl"></a></li>

                    

                </ul>
            </div> -->

                    <div class="adv">
                        <a href="#" class="download"></a>
                        <p>PC 安卓 iPhone WP iPad Mac 六大客户端</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="find-body">
            <div class="find-body-box">
                <div class="find-body-left">
                    <hot></hot>


                    <newDisk></newDisk>

                    <rank></rank>


                </div>

                <div class="find-body-right">
                    <div>
                        <p>登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</p>
                        <a href="#">用户登录</a>
                    </div>

                    <div>
                        <h3>
                            <span>入驻歌手</span>
                            <a href="javascript:;" @click="tiaozhuan"> 查看全部&nbsp;></a>
                        </h3>
                        <ul>
                            <li v-for="songer in UserList.regSonger">
                                <a href="#">
                                    <img :src="songer.img1v1Url + '?param=500y500'" alt="">
                                    <div>
                                        <h4>{{ songer.name }}</h4>
                                        <!-- <p>台湾歌手张惠妹</p> -->
                                    </div>
                                </a>
                            </li>


                        </ul>
                        <a href="#">申请成为网易音乐人</a>
                    </div>

                    <div>
                        <h3>热门主播</h3>
                        <ul>
                            <li v-for="hotRadio in UserList.hotRadio">
                                <a href="#">
                                    <img style="width: 40px;+height: 40px;" :src="hotRadio.avatarUrl + '?param=500y500'" alt="">
                                    <!-- <img src="../../../../public/upload" alt=""> -->
                                </a>
                                <div>
                                    <p>{{ hotRadio.nickName }}</p>
                                    <!-- <p>心理学家、美食家陈立教授</p> -->
                                </div>
                            </li>


                        </ul>
                    </div>
                </div>

            </div>
        </div>




    </div>
</template>

<script >
import hot from './hot.vue';
import newDisk from './newDisk.vue';
import rank from './rank.vue';
import { defineComponent, reactive } from 'vue';
import api from '@/api';
import { useRouter } from 'vue-router';

export default defineComponent({

    name: 'Home',
    components: { hot, newDisk, rank },

    setup() {
        const router = useRouter()
        //获取入驻歌手
        const UserList = reactive({
            regSonger: [],
            hotRadio: []
        })

        //发请求获取入驻歌手/热门主播列表
        async function getRegSonger() {
            const result1 = await api.recommend.getResidentSinger()
            // console.log(result1.artists);
            if (result1.code === 200) {
                UserList.regSonger = result1.artists.slice(0, 5)
            }

            const result2 = await api.recommend.gerHorRadio()
            if (result2.code === 200) {
                UserList.hotRadio = result2.data.list.slice(0, 5)
            }

        }


        //获取轮播图

        const Banner = reactive({
            bannerList: []


        })

        async function getBannerList() {
            const result = await api.recommend.getBanner()
            if (result.code === 200) {
                Banner.bannerList = result.banners
            }
        }


        //点击更多入驻歌手
        function tiaozhuan() {
            router.push('/songer')
        }

        return {
            getRegSonger,
            UserList,
            Banner,
            getBannerList,
            tiaozhuan
        }
    },
    mounted() {
        this.getRegSonger()
        this.getBannerList()
    }

});

</script>

<style lang="less">
.el-carousel__item h3 {
    display: flex;
    color: #475669;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>