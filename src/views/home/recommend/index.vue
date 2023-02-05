<template>
 <div class="findMusic">

<div class="find-top">
    <div class="carousel">
        <!-- 左右箭头 -->
        <a href="javascript:void(0);" class="arrow-left"><span></span></a>
        <a href="javascript:void(0);" class="arrow-right"><span></span></a>
        <!-- 小圆点 -->
        <ol class="circle"></ol>
        <!-- 轮播图片 -->
        <div class="carousel_main">
            <div class="carousel-box">
                <ul>
                    <li id="0"><a href="#"><img src="../../../../public/imgs/01.jpg"></a></li>
                    <li id="1"><a href="#"><img src="../../../../public/imgs/02.jpg"></a></li>
                    <li id="2" class="current"><a href="#"><img src="../../../../public/imgs/03.jpg"></a></li>
                    <li id="3"><a href="#"><img src="../../../../public/imgs/04.jpg"></a></li>
                    <li id="4"><a href="#"><img src="../../../../public/imgs/05.jpg"></a></li>
                    <li id="5"><a href="#"><img src="../../../../public/imgs/06.jpg"></a></li>
                    <li id="6"><a href="#"><img src="../../../../public/imgs/07.jpg"></a></li>
                    <li id="7"><a href="#"><img src="../../../../public/imgs/08.jpg"></a></li>
                    <li id="8"><a href="#"><img src="../../../../public/imgs/09.jpg"></a></li>
                    <li id="9"><a href="#"><img src="../../../../public/imgs/10.jpg"></a></li>
                </ul>
            </div>

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
                    <a href="#"> 查看全部&nbsp;></a>
                </h3>
                <ul>
                    <li v-for="songer in UserList.regSonger">
                        <a href="#">
                            <img :src="songer.img1v1Url" alt="">
                            <div>
                                <h4>{{songer.name}}</h4>
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
                            <img style="width: 40px;+height: 40px;" :src="hotRadio.avatarUrl" alt="">
                            <!-- <img src="../../../../public/upload" alt=""> -->
                        </a>
                        <div>
                            <p>{{hotRadio.nickName}}</p>
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
import { defineComponent,reactive } from 'vue';
import api from '@/api';

export default defineComponent({

  name: 'Home',
  components:{hot,newDisk,rank},

  setup() {
    //获取入驻歌手
    const UserList = reactive({
        regSonger:[],
        hotRadio:[]
    })

    //发请求获取入驻歌手/热门主播列表
    async function getRegSonger(){
        const result1 = await api.recommend.getResidentSinger()
        // console.log(result1.artists);
        if(result1.code === 200){
            UserList.regSonger = result1.artists.slice(0,5)
        }

        const result2 = await api.recommend.gerHorRadio()
            if(result2.code === 200){
                UserList.hotRadio = result2.data.list.slice(0,5)
            }
        
    }


    return {
        getRegSonger,
        UserList
    }
  },
  mounted(){
    this.getRegSonger()
  }

});

</script>

<style lang="less">

</style>