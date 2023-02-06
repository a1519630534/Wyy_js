<template>
     <!-- header部分开始 -->
     <header>

<!-- header-top开始 -->
<div class="header-top">
    <div class="header-top-box">
        <h1><a >
            <router-link to="/"></router-link>
        </a></h1>
        <ul class="header-top-ul">
            <li><a id="findMusic" href="#">发现音乐</a><em></em></li>
            <li><a id="myMusic" href="#">我的音乐</a><em></em></li>
            <li><a id="follow" href="#">关注</a><em></em></li>
            <li><a id="shop" href="#">商城</a><em></em></li>
            <li><a id="musician" href="#">音乐人</a><em></em></li>
            <li><a id="download" href="#">下载客户端</a><em></em></li>
        </ul>
        <div class="search">
            <input type="text" placeholder="音乐/视频/电台/用户" name="" id="">
        </div>
        <a href="#" class="designer">创作者中心</a>
        <a href="#" class="login">登录</a>
    </div>
</div>
<!-- header-top结束 -->

<div class="header-none-box"></div>

<!-- header-bottom开始 -->
<div class="header-bottom">
    <div class="header-bottom-box">
        <ul class="header-bottom-ul"> 
            <li><a id="intro" href="#" ><router-link to="/"><span :class="{'bottom-span-click':$route.path === '/'}">推荐</span></router-link></a></li>
            <li><a id="ranking" href="#"><router-link to="/rank"><span :class="{'bottom-span-click':$route.path === '/rank'}">排行榜</span></router-link></a></li>
            <li><a id="songList" href="#"><router-link to="/songlist"><span :class="{'bottom-span-click':$route.path === '/songlist'}">歌单</span></router-link></a></li>
            <li><a id="radio" href="#"><router-link to="/radio"><span :class="{'bottom-span-click':$route.path === '/radio'}">主播电台</span></router-link></a></li>
            <li><a id="singer" href="#"><router-link to="/songer"><span :class="{'bottom-span-click':$route.path === '/songer'}">歌手</span></router-link></a></li>
            <li><a id="newDisk" href="#"><router-link to="/newdisk"><span :class="{'bottom-span-click':$route.path === '/newdisk'}">新碟上架</span></router-link></a></li>
        </ul>
    </div>
</div>
<!-- header-bottom结束 -->

</header>
<!-- header部分结束 -->
</template>

<script>

import { defineComponent } from 'vue';

export default defineComponent({

  name: 'Header',

});

</script>

<style lang="less">

</style>