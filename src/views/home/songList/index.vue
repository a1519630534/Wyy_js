<template>
    <div class="songList">
        <div class="song-body">

            <div class="st">
                <h3>全部</h3>
                <a id="choice-click" href="javascript:;">
                    <span @click="isShowChoice = !isShowChoice">选择分类<em></em></span>
                </a>
                <a href="javascript:void()0;">热门</a>
            </div>

            <SongBody :switchText="switchText" ></SongBody>

            

            <div v-show="isShowChoice" class="choice">
            <div class="choice-t"><i></i></div>

            <div class="choice-body" @click="switchSongList">
                <div><a href="#">全部风格</a></div>

                <dl >
                    <dt><i class="dt-i-1"></i>语种</dt>
                    <dd>
                        <a href="#">华语</a>
                        <span>|</span>
                        <a href="#">欧美</a>
                        <span>|</span>
                        <a href="#">日语</a>
                        <span>|</span>
                        <a href="#">韩语</a>
                        <span>|</span>
                        <a href="#">粤语</a>
                        <span>|</span>
                    </dd>
                </dl>

                <dl>
                    <dt><i class="dt-i-2"></i>风格</dt>
                    <dd>
                        <a href="#">流行</a>
                        <span>|</span>
                        <a href="#">摇滚</a>
                        <span>|</span>
                        <a href="#">民谣</a>
                        <span>|</span>
                        <a href="#">电子</a>
                        <span>|</span>
                        <a href="#">舞曲</a>
                        <span>|</span>

                        <a href="#">说唱</a>
                        <span>|</span>
                        <a href="#">轻音乐</a>
                        <span>|</span>
                        <a href="#">爵士</a>
                        <span>|</span>
                        <a href="#">乡村</a>
                        <span>|</span>
                        <a href="#">R&B/Soul</a>
                        <span>|</span>

                        <a href="#">古典</a>
                        <span>|</span>
                        <a href="#">民族</a>
                        <span>|</span>
                        <a href="#">英伦</a>
                        <span>|</span>
                        <a href="#">金属</a>
                        <span>|</span>
                        <a href="#">蓝调</a>
                        <span>|</span>

                        <a href="#">雷鬼</a>
                        <span>|</span>
                        <a href="#">世界音乐</a>
                        <span>|</span>
                        <a href="#">拉丁</a>
                        <span>|</span>
                        <a href="#">New Age</a>
                        <span>|</span>
                        <a href="#">古风</a>
                        <span>|</span>
                        <a href="#">Bossa Nova</a>
                        <span>|</span>
                    </dd>
                </dl>

                <dl>
                    <dt><i class="dt-i-3"></i>场景</dt>
                    <dd>
                        <a href="#">清晨</a>
                        <span>|</span>
                        <a href="#">夜晚</a>
                        <span>|</span>
                        <a href="#">学习</a>
                        <span>|</span>
                        <a href="#">工作</a>
                        <span>|</span>
                        <a href="#">午休</a>
                        <span>|</span>

                        <a href="#">下午茶</a>
                        <span>|</span>
                        <a href="#">地铁</a>
                        <span>|</span>
                        <a href="#">驾车</a>
                        <span>|</span>
                        <a href="#">运动</a>
                        <span>|</span>
                        <a href="#">旅行</a>
                        <span>|</span>

                        <a href="#">散步</a>
                        <span>|</span>
                        <br>
                        <a href="#">酒吧</a>
                        <span>|</span>
                    </dd>
                </dl>

                <dl>
                    <dt><i class="dt-i-4"></i>情感</dt>
                    <dd>
                        <a href="#">怀旧</a>
                        <span>|</span>
                        <a href="#">清新</a>
                        <span>|</span>
                        <a href="#">浪漫</a>
                        <span>|</span>
                        <a href="#">伤感</a>
                        <span>|</span>
                        <a href="#">治愈</a>
                        <span>|</span>

                        <a href="#">放松</a>
                        <span>|</span>
                        <a href="#">孤独</a>
                        <span>|</span>
                        <a href="#">感动</a>
                        <span>|</span>
                        <a href="#">兴奋</a>
                        <span>|</span>
                        <a href="#">快乐</a>
                        <span>|</span>

                        <a href="#">安静</a>
                        <span>|</span>
                        <br>
                        <a href="#">思念</a>
                        <span>|</span>
                    </dd>
                </dl>

                <dl>
                    <dt><i class="dt-i-5"></i>主题</dt>
                    <dd class="last-dd">
                        <a href="#">综艺</a>
                        <span>|</span>
                        <a href="#">影视原声</a>
                        <span>|</span>
                        <a href="#">ACG</a>
                        <span>|</span>
                        <a href="#">儿童</a>
                        <span>|</span>
                        <a href="#">校园</a>
                        <span>|</span>

                        <a href="#">游戏</a>
                        <span>|</span>
                        <a href="#">70后</a>
                        <span>|</span>
                        <a href="#">80后</a>
                        <span>|</span>
                        <a href="#">90后</a>
                        <span>|</span>
                        <a href="#">网络歌曲</a>
                        <span>|</span>

                        <br>
                        <a href="#">KTV</a>
                        <span>|</span>
                        <a href="#">经典</a>
                        <span>|</span>
                        <a href="#">翻唱</a>
                        <span>|</span>
                        <a href="#">吉他</a>
                        <span>|</span>
                        <a href="#">钢琴</a>
                        <span>|</span>

                        <a href="#">器乐</a>
                        <span>|</span>
                        <a href="#">榜单</a>
                        <span>|</span>
                        <a href="#">00后</a>
                        <span>|</span>
                    </dd>
                </dl>

            </div>

            <div class="choice-b"></div>
        </div>

        </div>
    </div>
</template>

<script >

import { defineComponent,ref } from 'vue';
import SongBody from './songBody.vue';


export default defineComponent({
    name: "App",
   
    setup() {
        let isShowChoice = ref(false);

        //点击风格切换歌单列表
        let switchText = ref('')
        function switchSongList(event){
            switchText.value =  event.target.innerText
            isShowChoice.value = false
            // console.log(switchText);
        }


        

        return {
            isShowChoice,
            switchSongList,
            switchText,
           
            
        };
    },
    components: { SongBody }
});

</script>

<style lang="less">

</style>