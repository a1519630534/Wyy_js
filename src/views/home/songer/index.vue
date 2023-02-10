<template>
    <div class="singer">
        <div class="singer-body">

            <div class="sl">
                <!-- <h2>推荐</h2>
                <a class="curr" href="#">热门歌手</a> -->

                <div class="sl-b" v-for="m, index in menu">
                    <h2>{{ m.title }}</h2>
                    <a :class="{ curr: sex.selected }" href="javascript:;" v-for="sex, index in m.list"
                        @click="selType(sex,index)">{{ sex.title }}</a>

                </div>



            </div>

            <div class="sr">



                <div class="singer-b">
                    <div class="singer-top">
                        <h3>热门歌手</h3>
                    </div>

                    <ul>

                        <li v-for="hotList, index in songer.hotList">
                            <div>
                                <img :src="hotList.picUrl" alt="">
                                <a href="#"></a>
                            </div>
                            <p><a href="#">{{ hotList.name }}</a></p>
                            <a href="#"></a>
                        </li>


                    </ul>
                </div>

                <div class="for-all">
                    <ul class="ul-all">
                        <li v-for="allList, index in songer.allHotList">
                            <a href="#">{{ allList.name }}</a>
                            <a href="#"></a>
                        </li>




                    </ul>
                </div>

            </div>

        </div>
    </div>
</template>

<script>

import api from '@/api';
import { defineComponent, reactive, ref } from 'vue';


export default defineComponent({
    name: "Songer",

    setup() {

        const songer = reactive({
            hotList: [],
            allHotList: []
        })

        //获取热门歌手函数
        async function getHotSonger() {
            const result = await api.songer.getHotList()
            if (result.code === 200) {
                songer.hotList = result.artists.slice(0, 10)
                songer.allHotList = result.artists.slice(10, result.artists.length)
            }
        }

        //左侧菜单列表
        const menu = ref([
            {
                area: -1,
                title: '推荐',
                list: [
                    {
                        area: -1,
                        type: -1,
                        title: '推荐歌手',
                        selected: true
                    }

                ]
            },
            {
                area: 7,
                title: '华语',
                list: [
                    {
                        area: 7,
                        type: 1,
                        title: '华语男歌手',
                        selected: false
                    },
                    {
                        area: 7,
                        type: 2,
                        title: '华语女歌手',
                        selected: false
                    },
                    {
                        area: 7,
                        type: 3,
                        title: '华语组合/乐队',
                        selected: false
                    }
                ]
            },
            {
                area: 96,
                title: '欧美',
                list: [
                    {
                        area: 96,
                        type: 1,
                        title: '欧美男歌手',
                        selected: false
                    },
                    {
                        area: 96,
                        type: 2,
                        title: '欧美女歌手',
                        selected: false
                    },
                    {
                        area: 96,
                        type: 3,
                        title: '欧美组合/乐队',
                        selected: false
                    }
                ]
            },
            {
                area: 8,
                title: '日本',
                list: [
                    {
                        area: 8,
                        type: 1,
                        title: '日本男歌手',
                        selected: false
                    },
                    {
                        area: 8,
                        type: 2,
                        title: '日本女歌手',
                        selected: false
                    },
                    {
                        area: 8,
                        type: 3,
                        title: '日本组合/乐队',
                        selected: false
                    }
                ]
            },
            {
                area: 16,
                title: '韩国',
                list: [
                    {
                        area: 16,
                        type: 1,
                        title: '韩国男歌手',
                        selected: false
                    },
                    {
                        area: 16,
                        type: 2,
                        title: '韩国女歌手',
                        selected: false
                    },
                    {
                        area: 16,
                        type: 3,
                        title: '韩国组合/乐队',
                        selected: false
                    }
                ]
            },
            {
                area: 0,
                title: '其他',
                list: [
                    {
                        area: 0,
                        type: 1,
                        title: '其他男歌手',
                        selected: false
                    },
                    {
                        area: 0,
                        type: 2,
                        title: '其他女歌手',
                        selected: false
                    },
                    {
                        area: 0,
                        type: 3,
                        title: '其他组合/乐队',
                        selected: false
                    }
                ]
            }
        ]);

        //点击切换列表
        function selType(val,index) {
            menu.value.forEach(item => {
                const List = item.list
                List.forEach(item=>{
                    item.selected = false
                })
            });
            val.selected = true
            getSelTypeList(val.type, val.area)
        }

        // 发送切换列表请求
        async function getSelTypeList(type, area, initial) {
            if (!initial) {
                initial = -1
            }
            const result = await api.songer.getSelTypeList(type, area, initial)
            if (result.code === 200) {
                songer.hotList = result.artists.slice(0, 10)
                songer.allHotList = result.artists.slice(10, result.artists.length)
            }
        }
        return {
            getHotSonger,
            songer,
            menu,
            selType
        }
    },
    mounted() {
        this.getHotSonger()
    }
});

</script>

<style lang="less">

</style>