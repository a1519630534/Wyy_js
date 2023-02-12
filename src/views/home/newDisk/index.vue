<template>
    <div class="newDisk">
        <div class="disk-body">

            <div>
                <div class="disk-top">
                    <h3>热门新碟</h3>
                </div>
                <ul>

                    <li v-for="diskList, index in newDisk.hotList" @mouseenter="hoverShow(index)"
                        @mouseleave="hoverIndex = -1">
                        <div>
                            <img :src="diskList.picUrl + '?param=200y200'" alt="">
                            <a href="#"></a>
                            <a href="javascript:;" v-show="hoverIndex === index" @click="playNewDisk(diskList.id)"></a>
                        </div>
                        <p><a href="#">{{ diskList.name }}</a></p>
                        <p><a href="#">{{ diskList.artist.name }}</a></p>
                    </li>



                </ul>
            </div>

            <div>

                <div class="disk-top">
                    <h3>全部新碟</h3>
                    <ol>
                        <li v-for="taplist in tap"><a href="javascript:;" @click="tapSearch(taplist)">{{
                            taplist.title
                        }}</a></li>

                    </ol>
                </div>

                <ul>

                    <li v-for="tap, index in newDisk.tapList" @mouseenter="hoverDownShow(index)"
                        @mouseleave="hoverDownIndex = -1">
                        <div>
                            <img :src="tap.picUrl + '?param=200y200'" alt="">
                            <a href="#"></a>
                            <a href="javascript:;" v-show="hoverDownIndex === index" @click="playNewDisk(tap.id)"></a>
                        </div>
                        <p><a href="#">{{ tap.name }}</a></p>
                        <p><a href="#">{{ tap.artist.name }}</a></p>
                    </li>


                </ul>

            </div>

            <span style="display: block;">
                <el-pagination  style="margin: 20px 0 30px 225px;" small background layout="prev, pager,next, total"
                :total="total" prev-text="上一页" next-text="下一页" @current-change="handleCurrentChange"
                @prev-click="prevClick" @next-click="nextClick" :page-size="35" />
            </span>

        </div>
        
    </div>

</template>

<script>

import api from '@/api';
import { defineComponent, reactive, ref } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({

    name: 'NewDisk',
    setup() {

        const store = useStore()
        const newDisk = reactive({
            hotList: [],
            tapList: []
        })
        const tap = ref([
            {
                title: '全部',
                area: 'ALL'
            },
            {
                title: '',
                area: ''
            },
            {
                title: '华语',
                area: 'ZH'
            },
            {
                title: '',
                area: ''
            },
            {
                title: '欧美',
                area: 'EA'
            },
            {
                title: '',
                area: ''
            },
            {
                title: '韩国',
                area: 'KR'
            },
            {
                title: '',
                area: ''
            },
            {
                title: '日本',
                area: 'JP'
            },
        ])

        let plArea = ref('ALL')
        let total = ref(0)
        //标签数据

        //发送获取热门新碟请求

        async function getHotDisk() {
            const result = await api.newdisk.getHotDisk()
            if (result.code === 200) {
                newDisk.hotList = result.weekData.slice(0, 10)
            }
        }

        //点击标签切换列表
        async function tapSearch({ area }) {
            if (!area) {
                area = 'ALL'
            }
            plArea.value = area
            //发情请求获取数据
            getPlList(area,0)
        }

        //鼠标移入显示
        let hoverIndex = ref(-1)
        let hoverDownIndex = ref(-1)
        function hoverShow(index) {
            hoverDownIndex.value = -1
            hoverIndex.value = index
        }

        function hoverDownShow(index) {
            hoverIndex.value = -1
            hoverDownIndex.value = index
        }



        //点击播放按钮
        function playNewDisk(id) {
            console.log(id);
            store.dispatch('getPlayList', id)
        }



        //获取下方列表
        async function getPlList(plArea,i){
            const result = await api.newdisk.getTapDiskList(35, i, plArea)

            if (result.code === 200) {

                
                newDisk.tapList = result.albums
                total.value = result.total
                
            }
        }
        //点击下一页
        function nextClick(i) {
            
            getPlList(plArea.value, i)
        }
        //点击上一页
        function prevClick(i) {
            getPlList(plArea.value, i)
        }

        //点击页数
        function handleCurrentChange(i) {
            getPlList(plArea.value, i)
        }





        return {
            newDisk,
            getHotDisk,
            tap,
            tapSearch,
            hoverShow,
            hoverIndex,
            hoverDownShow,
            hoverDownIndex,
            playNewDisk,
            nextClick,
            prevClick,
            handleCurrentChange,
            total
        }
    },
    mounted() {
        this.getHotDisk(),
            this.tapSearch(10, 0)
    }

});

</script>

<style lang="less">

</style>