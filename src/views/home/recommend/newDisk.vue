<template>
    <div>
        <div class="left-top">
            <a class="hot" href="javascript:;">新碟上架</a>
            <a class="more" href="javascript:" @click="tiaozhuan">更多</a>
        </div>

        <div class="second-body">
            <div class="disk">
                <div>
                    <div class="carousel2">
                        <!-- <ul class="pre-ul">
                            <li>
                                <div>
                                    <img src="../../../../public/upload/disk06.png">
                                    <a href="#"></a>
                                    <span></span>
                                </div>
                                <p><a href="#">廿</a></p>
                                <p><a href="#">王一博</a></p>
                            </li>
                            <li>
                                <div>
                                    <img src="../../../../public/upload/disk07.png">
                                    <a href="#"></a>
                                    <span></span>
                                </div>
                                <p><a href="#">洛城</a></p>
                                <p><a href="#">薛之谦</a></p>
                            </li>
                            <li>
                                <div>
                                    <img src="../../../../public/upload/disk08.png">
                                    <a href="#"></a>
                                    <span></span>
                                </div>
                                <p><a href="#">信徒</a></p>
                                <p><a href="#">谢帝</a></p>
                            </li>
                            <li>
                                <div>
                                    <img src="../../../../public/upload/disk09.png">
                                    <a href="#"></a>
                                    <span></span>
                                </div>
                                <p><a href="#">最后的水族馆</a></p>
                                <p><a href="#">裘德</a></p>
                            </li>
                            <li>
                                <div>
                                    <img src="../../../../public/upload/disk10.jpg">
                                    <a href="#"></a>
                                    <span></span>
                                </div>
                                <p><a href="#">I'M MORE SOBER WHEN I'M DRUNK</a></p>
                                <p><a href="#">韦礼安</a></p>
                            </li>
                        </ul> -->
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
                        <ul class="next-ul">
                            <li>
                                <div>
                                    <img src="../../../../public/upload/disk07.png">
                                    <a href="#"></a>
                                    <span></span>
                                </div>
                                <p><a href="#">洛城</a></p>
                                <p><a href="#">薛之谦</a></p>
                            </li>
                            <li>
                                <div>
                                    <img src="../../../../public/upload/disk10.jpg">
                                    <a href="#"></a>
                                    <span></span>
                                </div>
                                <p><a href="#">I'M MORE SOBER WHEN I'M DRUNK</a></p>
                                <p><a href="#">韦礼安</a></p>
                            </li>
                            <li>
                                <div>
                                    <img src="../../../../public/upload/disk02.png">
                                    <a href="#"></a>
                                    <span></span>
                                </div>
                                <p><a href="#">异界来客</a></p>
                                <p><a href="#">幼稚园杀手</a></p>
                            </li>
                            <li>
                                <div>
                                    <img src="../../../../public/upload/disk04.jpg">
                                    <a href="#"></a>
                                    <span></span>
                                </div>
                                <p><a href="#">孤勇者</a></p>
                                <p><a href="#">陈奕迅</a></p>
                            </li>
                            <li>
                                <div>
                                    <img src="../../../../public/upload/disk05.jpg">
                                    <a href="#"></a>
                                    <span></span>
                                </div>
                                <p><a href="#">许光汉</a></p>
                                <p><a href="#">许光汉</a></p>
                            </li>
                        </ul>
                    </div>
                    <a class="carousel2-left" href="javascript:void(0);" style="font-size: 20px;"> &lt </a>
                    <a class="carousel2-right" href="javascript:void(0);" style="font-size: 20px;">></a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { defineComponent,reactive } from 'vue';
import api from '@/api';
import { useRouter } from 'vue-router';
export default defineComponent({

    name: 'Home_newDisk',

    setup(){
        //获取每日新碟
        const route = useRouter()
        const diskList = reactive({
            weekData:[]
        })

        async function getDayDisk(){
            const result = await api.recommend.getDayDisk()
            if(result.code === 200){
                // console.log(result.weekData);
                diskList.weekData = result.weekData.slice(0,5)
            }
        }


        //点击更多
        function tiaozhuan(){
            route.push('/newdisk')
        }
        return {
            diskList,
            getDayDisk,
            tiaozhuan
        }
    },
    mounted(){
        this.getDayDisk()
    }
});

</script>

<style lang="less">

</style>