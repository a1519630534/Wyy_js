<template>

    <!-- footer部分开始 -->
    <footer >

        <!-- <Budio></Budio> -->
        <div class="footer-box">
            <div class="footer-left">
                <div>
                    <ul>
                        <li><a href="#">服务条款</a></li>
                        <li></li>
                        <li><a href="#">隐私政策</a></li>
                        <li></li>
                        <li><a href="#">儿童隐私政策</a></li>
                        <li></li>
                        <li><a href="#">版权投诉指引</a></li>
                        <li></li>
                        <li><a href="#">意见反馈</a></li>
                        <li></li>
                        <li><a href="#">广告合作</a></li>
                    </ul>
                </div>
                <div>
                    <p>网易公司版权所有©1997-2021杭州乐读科技有限公司运营：</p><a href="#">浙网文[2021] 1186-054号</a>
                </div>
                <div>
                    <p>违法和不良信息举报电话：0571-89853516 举报邮箱：</p><a href="#">ncm5990@163.com</a>
                </div>
                <div>
                    <a href="#">粤B2-20090191-18 工业和信息化部备案管理系统网站</a>
                    <a href="#">浙公网安备 33010902002564号</a>
                </div>
            </div>
            <div class="footer-right">
                <ul>
                    <li><a href="#"></a><span></span></li>
                    <li><a href="#"></a><span></span></li>
                    <li><a href="#"></a><span></span></li>
                    <li><a href="#"></a><span></span></li>
                    <li><a href="#"></a><span></span></li>
                </ul>
            </div>
        </div>
        
    </footer>
    <!-- footer部分结束 -->
    
</template>

<script>


import { defineComponent, reactive, ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import Budio from './audio.vue'
export default defineComponent({

    name: 'Footer',
    components:{Budio},
    setup() {

        let playIndex = ref(0)

        const store = useStore()

        //获取歌单
        let playUrl = computed(() => {
            // if (store.state.audio.urlList === []) {

            //     return [{ url: '' }]
            // }

            return store.state.audio.urlList
        })

  
        //获取歌单名字
        
        let playName = computed(() => {
            
            // console.log(playName);
            return store.state.audio.playName || [{name:''}]
        })

        
        //切换上下歌曲
        function nextPlay(type) {
            if (type === 1) {
                playIndex.value++
                if (playIndex.value > playUrl.length) playIndex.value = playUrl.length
                console.log(playIndex.value);
            } else {
                playIndex.value--
                // console.log(playIndex.value);
                if (playIndex.value < 0) playIndex.value = 0
            }
        }
        return {
            playIndex,
            nextPlay,
            playUrl,
            playName

        }
    },

    mounted() {
        // console.log(store);
    },


});

</script>

<style lang="less">

</style>