<template>
  <div class="rank-right">

    <div class="rr-top">
      <div>
        <div class="rtl">
          <img :src="rankInfo.info.coverImgUrl" alt="">
          <span></span>
        </div>

        <div class="rtr">
          <div>
            <h2>{{ rankInfo.info.name }}</h2>
          </div>
          <div>
            <i></i>
            <span>最近更新：{{rankInfo.updateTime}}</span>
            <span>（刚刚更新）</span>
          </div>

          <div class="rtr3">
            <a href="javascript:void(0);">
              <i>播放<em></em></i>
            </a>
            <a href="javascript:void(0);"></a>
            <a href="javascript:void(0);"><i>({{rankInfo.info.subscribedCount}})</i></a>
            <a href="javascript:void(0);"><i>({{rankInfo.info.shareCount}})</i></a>
            <a href="javascript:void(0);"><i>下载</i></a>
            <a href="javascript:void(0);"><i>({{rankInfo.info.commentCount}})</i></a>
          </div>
        </div>

      </div>
    </div>

    <div class="rr-body">
      <div class="rrb-top">
        <h3>歌曲列表</h3>
        <span>{{rankInfo.info.trackCount}}首歌</span>
        <span>播放：<i>{{rankInfo.info.playCount}}</i>次</span>
      </div>

      <table>
        <thead>
          <tr>
            <th></th>
            <th>
              <div>标题</div>
            </th>
            <th>
              <div>时长</div>
            </th>
            <th>
              <div>歌手</div>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr :class="{top3:index<3}" v-for="songList,index in rankInfo.info.tracks">
            <td>
              <i style="margin-left: 25px;">{{ index+1 }}</i>
              <!-- <span class="span_bg">2</span> -->
            </td>

            <td>
              <a v-if="index<3" href="javascrit:void(0);">
                <img :src="songList.al.picUrl" alt="">
              </a>
              <a href="javascrit:void(0);"></a>
              <a href="javascrit:void(0);">{{songList.name}}</a>
              <!-- <a href="javascrit:void(0);"></a> -->
            </td>

            <td>
              <!-- 将返回的时间戳转换为歌曲时间 -->
              <span>{{ parseInt((songList.dt % (1000 * 60 * 60)) / (1000 * 60))   }}: {{String((songList.dt % (1000 * 60))).substring(0,2) }}</span>
              <div>
                <a href="javascrtpt:void(0);"></a>
                <a href="javascrtpt:void(0);"></a>
                <a href="javascrtpt:void(0);"></a>
                <a href="javascrtpt:void(0);"></a>
              </div>
            </td>

            <td>
              <a href="#">{{songList.ar[0].name}}</a>
            </td>
          </tr>



        </tbody>
      </table>
    </div>

    <div class="content">
      <div class="con-top">
        <h3>评论</h3>
        <span>共{{rankListComment.total}}条评论</span>
      </div>

      <div class="con-send">
        <div><img src="../../../../public/logo/user.jpg" alt=""></div>
        <div>
          <textarea name="text" placeholder="评论" cols="30" rows="10"></textarea>
        </div>

        <div>
          <a href="javascript:void(0);"></a>
          <a href="javascript:void(0);"></a>
          <a href="javascript:void(0);">评论</a>
          <!-- <span>140</span> -->
        </div>
      </div>

      <div class="con-jc">最新评论</div>

      <div class="con-body">
        <div v-for="comment,index in rankListComment.comment">
          <div><img :src="comment.user.avatarUrl" alt=""></div>
          <div>
            <a href="#">{{comment.user.nickname}}</a>
            ：{{comment.content}}
          </div>
          <div>
            <span>{{comment.timeStr}} </span>
            <a href="javascript:void(0);"></a>
            <a href="javascript:void(0);">({{ comment.likedCount }})</a>
            
            <i></i>
            <a href="javascript:void(0);">回复</a>
          </div>
        </div>



      </div>

    </div>

    <div class="pages">
      <a class="pre" href="javascript:void(0);">上一页</a>
      <a class="curr" href="javascript:void(0);">1</a>
      <a href="javascript:void(0);">2</a>
      <a href="javascript:void(0);">3</a>
      <a href="javascript:void(0);">4</a>
      <a href="javascript:void(0);">5</a>
      <a href="javascript:void(0);">6</a>
      <a href="javascript:void(0);">7</a>
      <a href="javascript:void(0);">8</a>
      <a href="javascript:void(0);">9</a>
      <i>...</i>
      <a href="javascript:void(0);">10503</a>
      <a class="next" href="javascript:void(0);">下一页</a>
    </div>

  </div>
</template>

<script setup>

import api from '@/api';
import useSwitchTime from '@/hooks/useSwitchTime'
// import rank from '@/api/home/rank';
import { onMounted, reactive,defineProps,watch } from 'vue';


// export default defineComponent({

//   name: 'App',
//   setup(){
//     return{

//     }
//   }

// });
const props = defineProps(['listId'])
// console.log(props.listId);

watch(props,(newValue,oldValue)=>{
  getRankInfo(newValue.listId)
  // console.log(newValue.listId);
})

const rankInfo = reactive({
  info: {},
  updateTime:''

})
 //获取排行榜评论
 const rankListComment = reactive({
    comment:[],
    commentTime:[],
    total:0
  })
//发请求获取歌单详情
async function getRankInfo(id) {
  //如果id不存在则默认排行榜
  if (!id) {
    id = 19723756
  }
  const result = await api.rank.getRankListInfo(id)
  if (result.code === 200) {

    rankInfo.info = result.playlist

    let time = result.playlist.updateTime
    
    rankInfo.updateTime = useSwitchTime(time)
    
 
  }
  const result1 = await api.rank.getRankComment(id,1)
  if(result1.code === 200 ){
    // console.log(result1);
    rankListComment.comment = result1.data.comments
    rankListComment.total = result1.totalCount
    //转换时间并组成新数组
    // rankListComment.commentTime = rankListComment.comment.map(item =>{
    //   // console.log(item.time);
    //   return useSwitchTime(item.time)
    // })
    // console.log(rankListComment.commentTime);
  }
 
}



//将歌曲毫秒转换为分钟

onMounted(() => {
  getRankInfo()
  // console.log(rankInfo);
})

</script>

<style lang="less">

</style>