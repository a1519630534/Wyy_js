<template>
    <!-- header部分开始 -->
    <header>

        <!-- header-top开始 -->
        <div class="header-top">
            <div class="header-top-box">
                <h1><a>
                        <router-link to="/"></router-link>
                    </a></h1>
                <ul class="header-top-ul">
                    <li><router-link to="/">发现音乐</router-link><em></em></li>
                    <li><router-link to="/mymusic">我的音乐</router-link><em></em></li>
                    <li><a id="follow" href="#">关注</a><em></em></li>
                    <li><a id="shop" href="#">商城</a><em></em></li>
                    <li><a id="musician" href="#">音乐人</a><em></em></li>
                    <li><a id="download" href="#">下载客户端</a><em></em></li>
                </ul>
                <div class="search">
                    <input type="text" placeholder="音乐/视频/电台/用户" name="" id="">
                </div>
                <a href="#" class="designer">创作者中心</a>
                <a href="#" class="login" @mouseenter="isShowDownMenu = 1" @mouseleave="isShowDownMenu = 0">
                    <span v-if="userInfo === {} || userInfo === null" @click="login" style="float: left;">登录</span>



                    <div class="userinfo" v-if="userInfo">
                        <img style="width: 30px;height: 30px;" :src="userInfo.avatarUrl" alt="">
                        <div v-show="isShowDownMenu">
                            <span @click="singOut">退出登录</span>

                        </div>
                    </div>
                </a>

            </div>
        </div>
        <!-- header-top结束 -->

        <div class="header-none-box">
            
        </div>
        <hr style="background-color: #c11515;height: 13px;width: 100%;margin: -5px 0;border: none;" v-if="route.path === '/mymusic'">
        <!-- header-bottom开始 -->
        <div class="header-bottom" v-if="route.path !== '/mymusic'">
            <div class="header-bottom-box">
                <ul class="header-bottom-ul">
                    <li><a id="intro" href="#"><router-link to="/"><span
                                    :class="{ 'bottom-span-click': $route.path === '/' }">推荐</span></router-link></a>
                    </li>
                    <li><a id="ranking" href="#"><router-link to="/rank"><span
                                    :class="{ 'bottom-span-click': $route.path === '/rank' }">排行榜</span></router-link></a>
                    </li>
                    <li><a id="songList" href="#"><router-link to="/songlist"><span
                                    :class="{ 'bottom-span-click': $route.path === '/songlist' }">歌单</span></router-link></a>
                    </li>
                    <li><a id="radio" href="#"><router-link to="/radio"><span
                                    :class="{ 'bottom-span-click': $route.path === '/radio' }">主播电台</span></router-link></a>
                    </li>
                    <li><a id="singer" href="#"><router-link to="/songer"><span
                                    :class="{ 'bottom-span-click': $route.path === '/songer' }">歌手</span></router-link></a>
                    </li>
                    <li><a id="newDisk" href="#"><router-link to="/newdisk"><span
                                    :class="{ 'bottom-span-click': $route.path === '/newdisk' }">新碟上架</span></router-link></a>
                    </li>
                </ul>
            </div>
        </div>
        <!-- header-bottom结束 -->

    </header>
    <!-- header部分结束 -->
    <div class="login_main" v-if="isShowQr">
        <div class="mark" @click="isShowQr = 0"></div>
        <div class="body">
            <div class="top">
                <span>登录</span>
                <span @click="anonimousLogin">游客登录</span>
                <span @click="offLogin">X</span>
            </div>
            <div class="main">
                <span>请扫码登录</span>
                <div class="img">
                    <img :src="loginKey.qrimg" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import api from '@/api';

import { defineComponent, ref, reactive, computed } from 'vue';
import useCookie from '@/hooks/useCookie'
import useSetUserInfo from '@/hooks/useSetUserInfo'
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

export default defineComponent({

    name: 'Header',

    setup() {
        const route = useRoute()

        
        const store = useStore()

        //从vuex获取用户信息
        const userInfo = computed(() => {
            return store.state.userinfo.userinfo
        })
        let isShowDownMenu = ref(0)

        let loginKey = reactive({
            key: '',
            qrimg: ''
        })
        let isShowQr = ref(0)

        let timer = ref(null)
        //点击登录按钮
        async function login() {
            isShowQr.value = 1

            let timerstamp = ref(new Date().getTime())

            const result = await api.login.getQrKey(timerstamp.value)

            if (result.code === 200) {
                loginKey.key = result.data.unikey
                // console.log(loginKey.key);
                timerstamp.value = new Date().getTime()
                const result1 = await api.login.getQrCreate(loginKey.key, timerstamp.value)
                if (result1.code === 200) {
                    // console.log(result1);
                    timerstamp.value = new Date().getTime()
                    loginKey.qrimg = result1.data.qrimg

                    timer.value = setInterval(async () => {
                        timerstamp.value = new Date().getTime()
                        const result2 = await api.login.getQrStatus(loginKey.key, timerstamp.value)
                        console.log(result2);

                        //扫码登录成功
                        if (result2.code === 803) {
                            useCookie.setCookie(result2.cookie)

                            getLoginStatus()
                            clearInterval(timer.value)
                            timer.value = null
                            isShowQr.value = 0
                        }

                        if (result2.code === 800) {
                            alert('二维码过期，请重新登录')
                            clearInterval(timer.value)
                            timer.value = null
                            isShowQr.value = 0
                        }


                    }, 2000);

                }
            }
        }

        //获取登录状态
        async function getLoginStatus() {
            const result = await api.login.getLoginStatus()
            if (result.data.code === 200) {
                useSetUserInfo.setUserInfo(result.data.profile)
                store.dispatch('getUserInfo')
            }
        }

        //点击X按钮
        function offLogin() {
            isShowQr.value = 0
            clearInterval(timer.value)
            timer.value = null
        }




        //游客登录
        async function anonimousLogin() {
            const result = await api.login.getAnonimousLogin()
            if (result.code === 200) {
                isShowQr.value = 0
                clearInterval(timer.value)
                timer.value = null
                useCookie.setCookie(result.cookie)
            }
        }




        //点击退出登录
        function singOut() {
            store.dispatch('singOut')
            location.reload()
        }


        return {
            loginKey,
            login,
            isShowQr,
            offLogin,
            anonimousLogin,
            getLoginStatus,
            store,
            userInfo,
            isShowDownMenu,
            singOut,
            route


        }
    },
    mounted() {
        
    }

});

</script>

<style lang="less">
.login_main {
    .mark {
        display: block;
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1;
        background-color: #000;
        opacity: 0.3;
    }

    .body {
        width: 500px;
        height: 300px;
        background-color: rgb(241, 241, 241);
        position: fixed;
        top: 150px;
        left: 566px;
        z-index: 2;

        .top {
            background-color: #333;
            height: 30px;
            width: 100%;

            span {
                &:nth-child(1) {
                    float: left;
                    color: white;
                    font-size: 15px;
                    padding: 5px 10px;

                }

                &:nth-child(2) {
                    cursor: pointer;
                    float: left;
                    color: white;
                    font-size: 15px;
                    padding: 5px 10px;

                }

                &:nth-child(3) {

                    cursor: pointer;
                    float: right;
                    color: white;
                    font-size: 15px;
                    padding: 5px 10px;
                }
            }
        }

        .main {
            text-align: center;
            margin-top: 20px;

            .img {
                // background-color: red;
                width: 200px;
                height: 200px;
                margin-left: 150px;
            }
        }
    }

}

.login {
    .userinfo {
        overflow: visible;
        position: relative;

        div {

            position: absolute;
            top: 30px;
            left: 0;
            color: rgb(184, 184, 184);
            width: 120px;
            background-color: #2b2b2b;
            z-index: 1;

            span {
                text-align: center;
                line-height: 30px;
                height: 30px;
                display: block;
                cursor: pointer;
                border-bottom: navajowhite;
            }
        }
    }
}
</style>