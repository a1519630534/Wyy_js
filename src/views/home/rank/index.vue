<template>
    <div class="ranking">
        <div class="rank-body">
            <div class="rank-left">
                <h3>云音乐特色榜</h3>
                <ul>
                    <li class="first_li_bg">
                        <img src="../../../../public/rank-imgs/rl01.jpg" alt="">
                        <p>每天更新</p>
                        <p>飙升榜</p>
                    </li>
                    <li>
                        <img src="../../../../public/rank-imgs/rl2.png" alt="">
                        <p>每天更新</p>
                        <p>新歌榜</p>
                    </li>
                    <li>
                        <img src="../../../../public/rank-imgs/rl3.png" alt="">
                        <p>每周四更新</p>
                        <p>原创榜</p>
                    </li>
                    <li>
                        <img src="../../../../public/rank-imgs/rl4.png" alt="">
                        <p>每天更新</p>
                        <p>热歌榜</p>
                    </li>
                </ul>
                <h3>全球媒体榜</h3>
                <ul>
                    <li>
                        <img src="../../../../public/rank-imgs/rl01.jpg" alt="">
                        <p>每周四更新</p>
                        <p>黑胶VIP爱听榜</p>
                    </li>
                    <li>
                        <img src="../../../../public/rank-imgs/rl02.png" alt="">
                        <p>每周五更新</p>
                        <p>云音乐说唱榜</p>
                    </li>
                    <li>
                        <img src="../../../../public/rank-imgs/rl03.png" alt="">
                        <p>每周四更新</p>
                        <p>云音乐古典榜</p>
                    </li>
                    <li>
                        <img src="../../../../public/rank-imgs/rl04.jpg" alt="">
                        <p>每周五更新</p>
                        <p>云音乐电音榜</p>
                    </li>
                    <li>
                        <img src="../../../../public/rank-imgs/rl05.png" alt="">
                        <p>每周四更新</p>
                        <p>云音乐ACG榜</p>
                    </li>

                    <li>
                        <img src="../../../../public/rank-imgs/rl06.png" alt="">
                        <p>每周四更新</p>
                        <p>云音乐韩语榜</p>
                    </li>
                    <li>
                        <img src="../../../../public/rank-imgs/rl07.jpg" alt="">
                        <p>每周五更新</p>
                        <p>云音乐国电榜</p>
                    </li>
                    <li>
                        <img src="../../../../public/rank-imgs/rl08.png" alt="">
                        <p>每周一更新</p>
                        <p>UK排行榜周榜</p>
                    </li>
                    <li>
                        <img src="../../../../public/rank-imgs/rl09.jpg" alt="">
                        <p>每周三更新</p>
                        <p>美国Billboard榜</p>
                    </li>
                    <li>
                        <img src="../../../../public/rank-imgs/rl10.jpg" alt="">
                        <p>每周三更新</p>
                        <p>Beatport全球电子舞曲榜</p>
                    </li>

                </ul>
            </div>

            <Rank_right></Rank_right>

        </div>
    </div>
</template>

<script>

import { defineComponent } from 'vue';
import Rank_right from './rank_right.vue';
// import rank_right from './rank_right.vue';
export default defineComponent({
    name: "rank",
    components: { Rank_right }
});

</script>

<style lang="less">

</style>