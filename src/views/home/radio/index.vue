<template>
    <div class="radio">

        <div class="radio-body">

            <div class="list">
                <ul>
                    <li v-for="radios, index in radio.categories" @click="typeSearch(radios.id)">
                        <a>
                            <span style="background:none;"><img style="width: 48px;height: 48px;"
                                    :src="radios.pic84x84IdUrl + '?param=500y500'" alt=""></span>
                            {{ radios.name }}
                        </a>
                    </li>



                </ul>
            </div>


            <!-- 排行榜 -->
            <div class="radio-t" v-if="defaultType === 0">

                <div>
                    <div class="radio-top">
                        <a href="#">推荐节目</a>
                        <a href="#">更多&gt;</a>
                    </div>
                    <ul>

                        <li v-for="comment in radio.commentList"> 
                            <a ><img style="width: 40px;height: 40px;" :src="comment.radio.picUrl + '?param=500y500'" alt=""><i></i></a>
                            <div>
                                <p>{{comment.name}}</p>
                                <p>{{comment.dj.brand}}</p>
                            </div>
                            <a style="text-align: center;">{{comment.radio.category}}</a>
                        </li>


                    </ul>
                </div>

                <div>
                    <div class="radio-top">
                        <a href="#">节目排行榜</a>
                        <a href="#">更多&gt;</a>
                    </div>
                    <ul>

                        <li v-for="hotList,index in radio.hotRank">
                            <a href="#"><img style="width: 40px;height: 40px;" :src="hotList.program.coverUrl + '?param=500y500'" alt=""><i></i></a>
                            <div style="width: 208px;">
                                <p>{{hotList.program.mainSong.name}}</p>
                                <p>{{hotList.program.radio.category}}</p>
                            </div>
                            <span>
                                <i style="width: 92%;"><i></i></i>
                            </span>
                        </li>




                    </ul>
                </div>

            </div>

            <div class="radb" v-show="defaultType === 1">

                <div class="radio-top">
                    <a href="#">推荐电台</a>
                    <!-- <a href="#">更多&gt;</a> -->
                </div>

                <ul>
                    <li v-for="typeList, index in radio.typeList">
                        <a href="#"><img :src="typeList.intervenePicUrl + '?param=500y500'" alt=""></a>
                        <div>
                            <h3><a href="#">{{ typeList.name }}</a></h3><br>
                            <p>{{ typeList.rcmdtext }}</p>
                        </div>
                    </li>



                </ul>

            </div>

            <div class="radb" v-if="defaultType === 1">

                <div class="radio-top">
                    <a href="#">电台排行榜</a>
                    <!-- <a href="#">更多&gt;</a> -->
                </div>

                <ul>
                    <li v-for="typeAll, index in radio.typeALlList">
                        <a href="#"><img :src="typeAll.intervenePicUrl + '?param=500y500'" alt=""></a>
                        <div>
                            <h3><a href="#">{{typeAll.name}}</a></h3><br>
                            <p>共{{typeAll.programCount}}期   订阅{{typeAll.subCount}}次</p>
                        </div>
                    </li>



                </ul>

            </div>

            <!-- 为点击查询时推荐电台 -->
            <div class="radb" v-if="defaultType === 0" v-for="List,index in radio.RecommentRadio">

                <div class="radio-top">
                    <a >{{List.categoryName}}<i>·</i>电台</a>
                    <a href="javascript:;" @click="moreRadio(List.categoryId)">更多&gt;</a>
                </div>

                <ul>
                    <li v-for="songList in List.radios" >
                        <a href="javascript:;"><img :src="songList.picUrl + '?param=500y500'" alt=""></a>
                        <div>
                            <h3><a >{{songList.name}}</a></h3><br>
                            <p>{{songList.rcmdText}}</p>
                        </div>
                    </li>



                </ul>

            </div>


        </div>
    </div>
</template>

<script >

import { defineComponent, reactive, ref } from 'vue';
import api from '@/api'
export default defineComponent({

    name: 'Radio',
    setup() {

        const radio = reactive({
            categories: [],
            typeList: [],
            typeALlList: [],
            commentList:[],
            hotRank:[],
            RecommentRadio:[]
        })

        let defaultType = ref(0)

        //获取电台分类列表
        async function getCategories() {
            const result = await api.radio.getRadioCategories()
            if (result.code === 200) {
                radio.categories = result.categories.slice(0, 18)
            }
        }

        //根据id获取电台新邦
        async function getRadioTypeList(type) {

            const result = await api.radio.getRadioTypeList(type)
            if (result.code === 200) {

                radio.typeList = result.djRadios.slice(0, 4)
            }

            //获取电台排行榜
            const result1 = await api.radio.getRadioHotList(type)
            if (result.code === 200) {

                // console.log(result1);
                radio.typeALlList = result1.djRadios
            }
        }
        //点击分类标签获取响应的电台列表
        function typeSearch(type) {
            defaultType.value = 1
            getRadioTypeList(type)
        }




        //获取推荐电台
        async function getRecommentList(){
            const result = await api.radio.getRecommentList()
            if(result.code === 200){
                radio.commentList = result.programs
            }

            const result1 = await api.radio.getHotJiemu()
            if(result1.code === 200){
                radio.hotRank = result1.data.list
            }
             //获取推荐电台
             const result2 = await api.radio.getRecommentRadio()
                if(result2.code === 200){
                    radio.RecommentRadio = result2.data.slice(0,5)
                }
             
        }




       

        
        
        //点击更多切换电台类别
        function moreRadio(categoryId){
            typeSearch(categoryId)
        }




        return {
            getCategories,
            radio,
            defaultType,
            getRadioTypeList,
            typeSearch,
            getRecommentList,
            moreRadio
        }
    },
    mounted() {
        this.getCategories(),
        this.getRecommentList()
    }

});

</script>

<style lang="less">

</style>