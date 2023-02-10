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
            <span>最近更新：{{ rankInfo.updateTime }}</span>
            <span>（刚刚更新）</span>
          </div>

          <div class="rtr3">
            <a href="javascript:void(0);">
              <i>播放<em></em></i>
            </a>
            <a href="javascript:void(0);"></a>
            <a href="javascript:void(0);"><i>({{ rankInfo.info.subscribedCount }})</i></a>
            <a href="javascript:void(0);"><i>({{ rankInfo.info.shareCount }})</i></a>
            <a href="javascript:void(0);"><i>下载</i></a>
            <a href="javascript:void(0);"><i>({{ rankInfo.info.commentCount }})</i></a>
          </div>
        </div>

      </div>
    </div>

    <div class="rr-body">
      <div class="rrb-top">
        <h3>歌曲列表</h3>
        <span>{{ rankInfo.info.trackCount }}首歌</span>
        <span>播放：<i>{{ rankInfo.info.playCount }}</i>次</span>
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
          <tr :class="{ top3: index < 3 }" v-for="songList, index in rankInfo.info.tracks">
            <td>
              <i style="margin-left: 25px;">{{ index+ 1 }}</i>
              <!-- <span class="span_bg">2</span> -->
            </td>

            <td>
              <a v-if="index < 3" href="javascrit:void(0);">
                <img :src="songList.al.picUrl" alt="">
              </a>
              <a href="javascrit:void(0);"></a>
              <a href="javascrit:void(0);">{{ songList.name }}</a>
              <!-- <a href="javascrit:void(0);"></a> -->
            </td>

            <td>
              <!-- 将返回的时间戳转换为歌曲时间 -->
              <span>{{ parseInt((songList.dt % (1000 * 60 * 60)) / (1000 * 60)) }}: {{ String((songList.dt % (1000 *
              60))).substring(0, 2) }}</span>
              <div>
                <a href="javascrtpt:void(0);"></a>
                <a href="javascrtpt:void(0);"></a>
                <a href="javascrtpt:void(0);"></a>
                <a href="javascrtpt:void(0);"></a>
              </div>
            </td>

            <td>
              <a href="#">{{ songList.ar[0].name }}</a>
            </td>
          </tr>



        </tbody>
      </table>
    </div>

    <div class="content">
      <div class="con-top">
        <h3>评论</h3>
        <span>共{{ total }}条评论</span>
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
        <div v-for="comment, index in rankListComment.comment">
          <div><img :src="comment.user.avatarUrl" alt=""></div>
          <div>
            <a href="#">{{ comment.user.nickname }}</a>
            ：{{ comment.content }}
          </div>
          <div>
            <span>{{ comment.timeStr }} </span>
            <a href="javascript:void(0);"></a>
            <a href="javascript:void(0);">({{ comment.likedCount }})</a>

            <i></i>
            <a href="javascript:void(0);">回复</a>
          </div>
        </div>



      </div>

    </div>

    <el-pagination style="margin: 20px 10px 30px 166px;" small background layout="prev, pager,next, total" :total="2000"
      prev-text="上一页" next-text="下一页" @current-change="handleCurrentChange" @prev-click="prevClick"
      @next-click="nextClick" :page-size="20" />

  </div>
</template>

<script setup>

import api from '@/api';
import useSwitchTime from '@/hooks/useSwitchTime'
// import rank from '@/api/home/rank';
import { useRoute } from 'vue-router';
import { onMounted, reactive, defineProps, watch, ref } from 'vue';



const props = defineProps(['listId', 'rankId'])
const route = useRoute()


let rankId = ref(19723756)

let total = ref(0)

let songid = ref(route.params.id)

watch(props, (newValue, oldValue) => {
  rankId.value = newValue.listId
  getRankInfo(newValue.listId)
  // getCommentList(newValue.listId)

})

const rankInfo = reactive({
  info: {},
  updateTime: ''

})
//获取排行榜评论
const rankListComment = reactive({
  comment: [],
  commentTime: [],
  total: 0,

})
//发请求获取歌单详情
async function getRankInfo(id, pageNo) {
  // console.log(id,'id');
  //如果id不存在则默认排行榜
  id = songid.value
  if (!id) {
    id = 19723756
  }
  const result = await api.rank.getRankListInfo(id)
  if (result.code === 200) {

    rankInfo.info = result.playlist

    let time = result.playlist.updateTime

    rankInfo.updateTime = useSwitchTime(time)


  }
  //获取评论
  getCommentList(id, pageNo)

}


//获取评论函数
async function getCommentList(id, pageNo) {
  const result = await api.rank.getRankComment(id, pageNo)
  if (result.code === 200) {
    // console.log(result);
    rankListComment.comment = result.data.comments
    rankListComment.total = result.totalCount
    total.value = result.data.totalCount

  }
}

//点击下一页
function nextClick(i) {
  console.log(rankId.value);
  getCommentList(rankId.value, i)
}
//点击上一页
function prevClick(i) {
  getCommentList(rankId.value, i)
}

//点击页数
function handleCurrentChange(i) {
  getCommentList(rankId.value, i)
}


//将歌曲毫秒转换为分钟

onMounted(() => {


  getRankInfo(rankId.value)
  console.log(route.params.id);

  // console.log(rankInfo);
})

</script>

<style lang="less">

</style>