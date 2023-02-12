<template>
    <div class="ranking">
        <div class="rank-body">
            <div class="rank-left">
                <h3>云音乐特色榜</h3>
                <ul>
                    <li :class="{first_li_bg:defaindex === index}" v-for="List,index in Rank.rankList " @click="swIndex(index,List.id)" >
                        <img :src="List.coverImgUrl + '?param=500y500'" alt="">
                        <p>{{ List.updateFrequency }}</p>
                        <p>{{List.name}}</p>
                    </li>

                </ul>
                <h3>全球媒体榜</h3>
                <ul>
                    <li :class="{first_li_bg:glDefaindex === index}" v-for="global,index in Rank.globalList" @click="swGlIndex(index,global.id)">
                        <img :src="global.coverImgUrl + '?param=500y500'" alt="">
                        <p>{{ global.updateFrequency }}</p>
                        <p>{{global.name}}</p>
                    </li>


                </ul>
            </div>

            <Rank_right :listId="listId" :rankId="rankId"></Rank_right>

        </div>
    </div>
</template>

<script>

import { defineComponent,reactive,ref } from 'vue';
import { useRoute } from 'vue-router';
import Rank_right from './rank_right.vue';
import api from '@/api'
// import rank_right from './rank_right.vue';
export default defineComponent({
    name: "rank",
    components: { Rank_right },


    setup(){

        //存储榜单列表
        const Rank = reactive({
            rankList:[],
            globalList:[]
        })

        //请求榜单列表函数

        async function getRankList(){
            const result = await api.rank.getAllRankList()
            if(result.code === 200){
                // console.log(result);
                Rank.rankList = result.list.slice(0,4)
                Rank.globalList = result.list.slice(5,15)
            }
        }


        let listId = ref(19723756)
        //点击左边排行榜切换背景色
        let defaindex = ref(0)
        let glDefaindex = ref(-1)
        function swIndex(index,id){
            glDefaindex.value = -1
            defaindex.value = index
            listId.value = id
            // console.log(listId.value);
            // console.log(defaindex.value  );
        }

        function swGlIndex(index,id){
            defaindex.value =-2
            glDefaindex.value = index
            listId.value = id
            // console.log(listId.value);
            // console.log(defaindex.value  );
        }

        //接受params参数
        const {params} = useRoute()
        let rankId = ref(params.id)
        // console.log(rankId.value);


        return {
            Rank,
            getRankList,
            swIndex,
            swGlIndex,
            defaindex,
            listId,
            glDefaindex,
            rankId
        }
    },
    mounted(){
        this.getRankList()
    }
});

</script>

<style lang="less">


.ranking{
    width: 100%;
    background-color: #f5f5f5;
    .rank-body{
        width: 982px;
        margin: auto;
        overflow: hidden;
        border-left: 1px solid #d3d3d3;
        border-right: 1px solid #d3d3d3;
    }
}

.first_li_bg{
    background-color: #e6e6e6;
}

.rank-left{
    float: left;
    width: 240px;
    height: 100%;
    background-color: #f9f9f9;
    border-right: 1px solid #d3d3d3;
    h3{
        width: 100%;
        height: 30px;
        margin-top: 40px;
        padding: 0 0 10px 15px;
        font-size: 15px;
    }
    ul{
        width: 100%;
        li{
            position: relative;
            width: 100%;
            height: 62px;
            padding: 10px 0 10px 20px;
            cursor: pointer;
            &:hover{
                background-color: #e6e6e6;
            }
            img{
                position: absolute;
                top: 10px;
                left: 20px;
                width: 40px;
                height: 40px;
            }
            p{
                position: absolute;
                left: 70px;
                font-size: 12px;
                &:nth-child(1){
                    top: 10px;
                    color: #333;
                }
                &:nth-child(2){
                    top: 30px;
                    color: #999;
                }
            }
        }
    }
}


.rank-right{
    float: left;
    width: 740px;
    background-color: #fff;
}

.rr-top{
    width: 100%;
    height: 240px;
    padding: 40px;
    &>div{
        width: 100%;
        height: 100%;
    }
    .rtl{
        position: relative;
        float: left;
        width: 158px;
        height: 158px;
        padding: 3px;
        border: 1px solid #ccc;
        img{
            width: 150px;
            height: 150px;
        }
        span{
            position: absolute;
            top: 3px;
            left: 3px;
            width: 150px;
            height: 150px;
            background: url('../../../../public/logo/coverall.png') no-repeat -230px -380px;
        }
    }
    .rtr{
        float: left;
        width: 475px;
        height: 115px;
        margin-left: 25px;
        div:nth-child(1){
            width: 100%;
            height: 24px;
            margin: 16px 0 4px 0;
            h2{
                font-size: 20px;
                line-height: 24px;
            }
        }

        div:nth-child(2){
            width: 100%;
            height: 35px;
            margin-bottom: 20px;
            i{
                display: inline-block;
                width: 13px;
                height: 13px;
                margin: 9px 0 0 3px;
                background: url('../../../../public/logo/icon.png') no-repeat -18px -682px;
            }
            span:nth-child(2){
                color: #666;
                font-size: 13px;
            }
            span:last-child{
                color: #999;
                font-size: 12px;
            }
        }
        
        .rtr3{
            width: 100%;
            height: 31px;
            margin-bottom: 25px;
            a{
                float: left;

                &:nth-child(1){
                    width: 66px;
                    height: 31px;
                    padding-right: 5px;
                    color: #fff;
                    background: url('../../../../public/logo/button2.png') no-repeat right -428px;
                    i{
                        float: left;
                        width: 100%;
                        height: 100%;
                        padding: 0 7px 0 8px;
                        background-image: url('../../../../public/logo/button2.png');
                        background-repeat: no-repeat;
                        background-position: 0 -387px;
                        line-height: 29px;
                        text-align: center;
                        font-size: 12px;
                        font-style: normal;
                        em{
                            float: left;
                            width: 20px;
                            height: 18px;
                            margin: 6px 2px 2px 0;
                            background-image: url('../../../../public/logo/button2.png');
                            background-repeat: no-repeat;
                            background-position: 0 -1622px;
                        }
                    }
                }

                &:nth-child(2){
                    width: 31px;
                    height: 31px;
                    margin-left: -3px;
                    margin-right: 5px;
                    background: url('../../../../public/logo/button2.png') no-repeat 0 -1588px;
                    &:hover{
                        background: url('../../../../public/logo/button2.png') no-repeat -40px -1588px;
                    }
                }

                &:nth-child(3){
                    width: 89px;
                    height: 31px;
                    padding-right: 5px;
                    margin-right: 6px;
                    background: url('../../../../public/logo/button2.png') no-repeat right -1020px;
                    i{
                        float: left;
                        width: 100%;
                        height: 100%;
                        padding: 0 2px 0 28px;
                        text-align: center;
                        color: #333;
                        font: normal 12px/30px simsun,\5b8b\4f53;
                        background: url('../../../../public/logo/button2.png') no-repeat 0 -977px;
                        &:hover{
                            background: url('../../../../public/logo/button2.png') no-repeat 0 -1063px;
                        }
                    }
                }

                &:nth-child(4){
                    width: 77px;
                    height: 31px;
                    padding-right: 5px;
                    margin-right: 6px;
                    background-color: green;
                    background: url('../../../../public/logo/button2.png') no-repeat right -1020px;
                    i{
                        float: left;
                        width: 100%;
                        height: 100%;
                        padding: 0 2px 0 28px;
                        text-align: center;
                        color: #333;
                        font: normal 12px/30px simsun,\5b8b\4f53;
                        background: url('../../../../public/logo/button2.png') no-repeat 0 -1225px;
                        &:hover{
                            background: url('../../../../public/logo/button2.png') no-repeat 0 -1268px;
                        }
                    }   
                }

                &:nth-child(5){
                    width: 59px;
                    height: 31px;
                    padding-right: 5px;
                    margin-right: 6px;
                    background-color: red;
                    background: url('../../../../public/logo/button2.png') no-repeat right -1020px;
                    i{
                        float: left;
                        width: 100%;
                        height: 100%;
                        padding: 0 2px 0 28px;
                        color: #333;
                        font: normal 12px/30px simsun,\5b8b\4f53;
                        background: url('../../../../public/logo/button2.png') no-repeat 0 -2761px;
                        &:hover{
                            background: url('../../../../public/logo/button2.png') no-repeat 0 -2805px;
                        }
                    }
                }

                &:nth-child(6){
                    width: 78px;
                    height: 31px;
                    padding-right: 5px;
                    margin-right: 6px;
                    background: url('../../../../public/logo/button2.png') no-repeat right -1020px;
                    i{
                        float: left;
                        width: 100%;
                        height: 100%;
                        padding: 0 2px 0 28px;
                        color: #333;
                        font: normal 12px/30px simsun,\5b8b\4f53;
                        background-color: red;
                        background: url('../../../../public/logo/button2.png') no-repeat 0 -1465px;
                        &:hover{
                            background: url('../../../../public/logo/button2.png') no-repeat 0 -1508px;
                        }
                    }
                }



            }
        }

    }
}


.rr-body{
    width: 100%;
    padding: 0 30px 20px 40px;
}

.rrb-top{
    width: 100%;
    height: 35px;
    border-bottom: 2px solid #c20c0c;
    h3{
        float: left;
        font-size: 20px;
        line-height: 28px;
        font-weight: normal;
    }
    span{
        float: left;
        margin: 9px 0 0 20px;
        font-size: 12px;
        color: #666;
        &:last-child{
            float: right;
        }
        i{
            font-weight: bold;
            color: #c20c0c;
            font-style: normal;
        }
    }
}

table{
    width: 100%;
    border-collapse: separate;
    border-spacing: 0px;
}

thead{
    width: 100%;
    tr{
        th{
            height: 38px;
            color: #666;
            background-color: #f7f7f7;
            font-weight: normal;
            background: url('../../../../public/logo/table.png') repeat-x 0 0;
            &:nth-child(1){
                width: 12%;
            }
            &:nth-child(2){
                width: 48%;
                
            }
            &:nth-child(3){
                width: 14%;
            }
            &:nth-child(4){
                width: 30%;
            }

            div{
                height: 34px;
                text-align: left;
                font-size: 12px;
                line-height: 16px;
                padding: 8px 10px 8px 10px;
                background: url('../../../../public/logo/table.png') no-repeat 0 -56px;
            }

        }
    }
}

tbody{
    width: 100%;
    tr:nth-child(odd){
        background-color: #f7f7f7;
    }

    .top3{
        height: 70px;
        td:nth-child(1){
            padding: 6px 10px 6px 10px;
            i{
                float: left;
                color: #999;
                font-size: 12px;
                font-style: normal;
            }
            .span_bg{
                float: right;
                font-size: 10px;
                color: #bb2128;
                padding-left: 8px;
                line-height: 17px;
                font-family: Arial, Helvetica, sans-serif;
                background: url('../../../../public/logo/icon.png') no-repeat -74px -299px;
            }
        }

        td:nth-child(2){
            padding: 10px;
            img{
                width: 50px;
                height: 50px;
            }
            a{
                float: left;
            }
            a:nth-child(1){
                width: 50px;
                height: 50px;
            }
            a:nth-child(2){
                width: 17px;
                height: 17px;
                background: url('../../../../public/logo/table.png') no-repeat 0 -103px;
                margin: 17px 8px 0 15px;
                &:hover{
                    background: url('../../../../public/logo/table.png') no-repeat 0 -128px;
                }
            }
            a:nth-child(3){
                color: #333;
                font-size: 12px;
                margin: 17px 8px 0 0;
                &:hover{
                    text-decoration: underline;
                }
            }
            a:nth-child(4){
                width: 23px;
                height: 17px;
                margin: 17px 8px 0 0;
                background: url('../../../../public/logo/table.png') no-repeat 0 -151px;
                &:hover{
                    background: url('../../../../public/logo/table.png') no-repeat -30px -151px;
                }
            }


        }

        td:nth-child(3){
            padding: 6px 10px 6px 10px;
            span{
                font-family: Arial, Helvetica, sans-serif;
                font-size: 12px;
                color: #333;
            }
            &>div{
                display: none;
                a{
                    float: left;
                    margin-top: 2px;
                    background-repeat: no-repeat;
                }
                a:nth-child(1){
                    width: 13px;
                    height: 13px;
                    background-image: url('../../../../public/logo/icon.png');
                    background-position: 0 -700px;
                    &:hover{
                        background-position: -22px -700px;
                    }
                }
                a:nth-child(2){
                    width: 18px;
                    height: 16px;
                    margin-left: 2px;
                    background-image: url('../../../../public/logo/table.png');
                    background-position: 0 -174px;
                    &:hover{
                        background-position: -20px -174px;
                    }
                }
                a:nth-child(3){
                    width: 18px;
                    height: 16px;
                    margin-left: 2px;
                    background-image: url('../../../../public/logo/table.png');
                    background-position: 0 -195px;
                    &:hover{
                        background-position: -20px -195px;
                    }
                }
                a:nth-child(4){
                    width: 18px;
                    height: 16px;
                    margin-left: 2px;
                    background-image: url('../../../../public/logo/table.png');
                    background-position: -81px -174px;
                    &:hover{
                        background-position: -104px -174px;
                    }
                }

            }
        }

        td:nth-child(4){
            padding: 6px 10px 6px 10px;
            a{
                font-family: Arial, Helvetica, sans-serif;
                font-size: 12px;
                color: #333;
                &:hover{
                    text-decoration: underline;
                }
            }
        }
    }

    tr{
        height: 30px;
        td{
            padding: 6px 10px 6px 10px;
        }
        td:nth-child(1){
            i{
                float: left;
                color: #999;
                font-size: 12px;
                font-style: normal;
            }
            span{
                float: right;
                width: 16px;
                height: 17px;
                font-family: Arial, Helvetica, sans-serif;
                background: url('../../../../public/logo/icon.png') no-repeat -67px -283px;
            }
        }

        td:nth-child(2){
            a:nth-child(1){
                float: left;
                width: 17px;
                height: 17px;
                background: url('../../../../public/logo/table.png') no-repeat 0 -103px;
                margin-right: 8px;
                &:hover{
                    background: url('../../../../public/logo/table.png') no-repeat 0 -128px;
                }
            }
            a:nth-child(2){
                float: left;
                color: #333;
                font-size: 12px;
                &:hover{
                    text-decoration: underline;
                }
            }

        }

        td:nth-child(3){
            padding: 6px 10px 6px 10px;
            span{
                font-family: Arial, Helvetica, sans-serif;
                font-size: 12px;
                color: #333;
            }
            &>div{
                display: none;
                a{
                    float: left;
                    margin-top: 2px;
                    background-repeat: no-repeat;
                }
                a:nth-child(1){
                    width: 13px;
                    height: 13px;
                    background-image: url('../../../../public/logo/icon.png');
                    background-position: 0 -700px;
                    &:hover{
                        background-position: -22px -700px;
                    }
                }
                a:nth-child(2){
                    width: 18px;
                    height: 16px;
                    margin-left: 2px;
                    background-image: url('../../../../public/logo/table.png');
                    background-position: 0 -174px;
                    &:hover{
                        background-position: -20px -174px;
                    }
                }
                a:nth-child(3){
                    width: 18px;
                    height: 16px;
                    margin-left: 2px;
                    background-image: url('../../../../public/logo/table.png');
                    background-position: 0 -195px;
                    &:hover{
                        background-position: -20px -195px;
                    }
                }
                a:nth-child(4){
                    width: 18px;
                    height: 16px;
                    margin-left: 2px;
                    background-image: url('../../../../public/logo/table.png');
                    background-position: -81px -174px;
                    &:hover{
                        background-position: -104px -174px;
                    }
                }

            }
        }

        td:nth-child(4){
            padding: 6px 10px 6px 10px;
            a{
                font-family: Arial, Helvetica, sans-serif;
                font-size: 12px;
                color: #333;
                &:hover{
                    text-decoration: underline;
                }
            }
        }


    }
}


.content{
    width: 100%;
    padding: 0 30px 10px 30px;
}

.con-top{
    width: 100%;
    height: 35px;
    border-bottom: 2px solid #c20c0c;
    h3{
        float: left;
        font-size: 20px;
        line-height: 28px;
        font-weight: normal;
    }
    span{
        float: left;
        margin: 9px 0 0 20px;
        font-size: 12px;
        color: #666;
    }

}

.con-send{
    width: 100%;
    height: 100px;
    margin-top: 20px;
    margin-bottom: 20px;
    &>div:nth-child(1){
        float: left;
        width: 50px;
        height: 50px;
        img{
            width: 50px;
            height: 50px;
        }
    }

    &>div:nth-child(2){
        float: left;
        width: 610px;
        height: 64px;
        margin-left: 10px;
        background-color: green;
        textarea{
            width: 100%;
            height: 100%;
            resize: none;
            overflow: auto;
            font-size: 12px;
            color: #333;
            text-align: left;
            border-radius: 2px;
            padding: 5px 6px 6px 6px;
            outline: none;
            border: 1px solid #cdcdcd;
        }
    }

    &>div:nth-child(3){
        float: right;
        width: 610px;
        height: 35px;
        padding-top: 10px;
        a:nth-child(1){
            float: left;
            width: 18px;
            height: 18px;
            margin-right: 10px;
            background: url('../../../../public/logo/icon.png') no-repeat -40px -490px;
        }
        a:nth-child(2){
            float: left;
            width: 18px;
            height: 18px;
            background: url('../../../../public/logo/icon.png') no-repeat -60px -490px;
        }
        a:nth-child(3){
            float: right;
            width: 46px;
            height: 25px;
            color: #fff;
            font-size: 12px;
            line-height: 25px;
            text-align: center;
            background: url('../../../../public/logo/button.png') no-repeat -84px -64px;
            &:hover{
                background: url('../../../../public/logo/button.png') no-repeat -84px -94px;
            }
        }
        span{
            float: right;
            font-size: 12px;
            color: #999;
            margin: 5px 10px 0 0;
        }


    }

}

.con-jc{
    width: 100%;
    height: 20px;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 13px;
    color: #333;
    font-weight: bold;
    line-height: 20px;
    border-bottom: 1px solid #cfcfcf;
}

.con-body{
    &>div{
        width: 100%;
        height: 100px;
        padding: 15px 0;
        border-bottom: 1px dotted #ccc;

        &>div:nth-child(1){
            float: left;
            width: 50px;
            height: 50px;
            img{
                width: 50px;
                height: 50px;
            }
        }

        &>div:nth-child(2){
            float: left;
            width: 610px;
            height: 40px;
            font-size: 12px;
            color: #333;
            margin-left: 10px;
            a{
                font-size: 12px;
                color: #0c73c2;
                &:hover{
                    text-decoration: underline;
                }
            }
        }

        &>div:nth-child(3){
            float: right;
            width: 610px;
            height: 16px;
            margin-top: 15px;
            margin-left: 10px;
            span{
                color: #999;
                font-size: 12px;
            }

            a:nth-child(2){
                float: right;
                width: 15px;
                height: 14px;
                margin-left: 10px;
                background: url('../../../../public/logo/icon2.png') -150px 0;
            }

            a:nth-child(3){
                float: right;
                color: #333;
                margin-left: 10px;
                font-size: 12px;
                &:hover{
                    text-decoration: underline;
                }
            }
            
            a:nth-child(5){
                float: right;
                color: #333;
                font-size: 12px;
                &:hover{
                    text-decoration: underline;
                }
            }
        }

    }

}



</style>